/** biome-ignore-all lint/performance/noBarrelFile: it's fine */
export type {
	KyselifyDatabase,
	KyselifyMultiSchemaDatabase,
	KyselifySingleSchemaDatabase,
	KyselifyTable,
	SchemafulTableAndViewNames,
} from './kyselify.mjs'

// biome-ignore lint/suspicious/noConsole: it's fine
console.warn(
	'`kysely-supabase` should only be imported with the `type` annotation. It has no runtime exports, for now.',
)
