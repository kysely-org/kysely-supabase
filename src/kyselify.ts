import type {ColumnType} from 'kysely'

export type KyselifyDatabase<Database> = keyof Database extends 'public'
  ? KyselifySingleSchemaDatabase<Database>
  : KyselifyMultiSchemaDatabase<Database>

export type KyselifySingleSchemaDatabase<Database> =
  'public' extends keyof Database
    ? 'Tables' extends keyof Database['public']
      ? {
          [TableName in keyof Database['public']['Tables']]: KyselifyTable<
            Database['public']['Tables'][TableName]
          >
        }
      : never
    : never

export type KyselifyMultiSchemaDatabase<Database> = {
  [SchemafulTableName in SchemafulTableNames<Database>]: SchemafulTableName extends `${infer Schema extends keyof Database & string}.${infer TableName}`
    ? 'Tables' extends keyof Database[Schema]
      ? TableName extends keyof Database[Schema]['Tables']
        ? KyselifyTable<Database[Schema]['Tables'][TableName]>
        : never
      : never
    : never
}

export type SchemafulTableNames<Database> = {
  [Schema in keyof Database]: 'Tables' extends keyof Database[Schema]
    ? `${Schema & string}.${keyof Database[Schema]['Tables'] & string}`
    : never
}[keyof Database]

export type KyselifyTable<Table> = 'Row' extends keyof Table
  ? {
      [Column in keyof Table['Row']]: ColumnType<
        Table['Row'][Column],
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
