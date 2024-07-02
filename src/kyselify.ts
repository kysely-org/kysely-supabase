import type {ColumnType} from 'kysely'

type SupabaseInternalSchemas = 'graphql_public' | 'storage'

export type KyselifyDatabase<Database> = keyof Database extends
  | 'public'
  | SupabaseInternalSchemas
  ? KyselifySingleSchemaDatabase<Database>
  : KyselifySingleSchemaDatabase<Database> &
      KyselifyMultiSchemaDatabase<Database>

export type KyselifySingleSchemaDatabase<Database> =
  'public' extends keyof Database
    ? 'Tables' extends keyof Database['public']
      ? {
          [TableName in keyof Database['public']['Tables']]: KyselifyTable<
            Database['public']['Tables'][TableName]
          >
        } & ('Views' extends keyof Database['public']
          ? {
              [ViewName in keyof Database['public']['Views']]: KyselifyTable<
                Database['public']['Views'][ViewName]
              >
            }
          : never)
      : never
    : never

export type KyselifyMultiSchemaDatabase<Database> = {
  [SchemafulTableOrViewName in SchemafulTableAndViewNames<Database>]: SchemafulTableOrViewName extends `${infer Schema extends keyof Database & string}.${infer TableOrViewName}`
    ? 'Tables' extends keyof Database[Schema]
      ? TableOrViewName extends keyof Database[Schema]['Tables']
        ? KyselifyTable<Database[Schema]['Tables'][TableOrViewName]>
        : 'Views' extends keyof Database[Schema]
          ? TableOrViewName extends keyof Database[Schema]['Views']
            ? KyselifyTable<Database[Schema]['Views'][TableOrViewName]>
            : never
          : never
      : never
    : never
}

export type SchemafulTableAndViewNames<Database> = {
  [Schema in Exclude<keyof Database, SupabaseInternalSchemas>]:
    | ('Tables' extends keyof Database[Schema]
        ? `${Schema & string}.${keyof Database[Schema]['Tables'] & string}`
        : never)
    | ('Views' extends keyof Database[Schema]
        ? `${Schema & string}.${keyof Database[Schema]['Views'] & string}`
        : never)
}[Exclude<keyof Database, SupabaseInternalSchemas>]

export type KyselifyTable<Table> = 'Row' extends keyof Table
  ? {
      [Column in keyof Table['Row']]: ColumnType<
        undefined extends Table['Row'][Column]
          ? Exclude<Table['Row'][Column], undefined> | null
          : Table['Row'][Column],
        'Insert' extends keyof Table
          ? Column extends keyof Table['Insert']
            ? Table['Insert'][Column]
            : never
          : never,
        'Update' extends keyof Table
          ? Column extends keyof Table['Update']
            ? Table['Update'][Column]
            : never
          : never
      >
    }
  : never
