# kysely-supabase

Supabase is a combination of open-source tools. They're building the features of Firebase using enterprise-grade, open-source products. If the tools and communities exist, with an MIT, Apache 2, or equivalent open license, they will use and support that tool. If the tool doesn't exist, they build and open-source it themselves. Supabase is not a 1-to-1 mapping of Firebase. Their aim is to give developers a Firebase-like developer experience using open-source tools.

As of Apr 6, 2024, `@supabase/supabase-js` (the client library) has 292,860 weekly downloads on npm, while `supabase` (the CLI) has 80,273 weekly downloads on npm. It is a popular all-in-one development platform for Node.js and TypeScript.

Their CLI supports TypeScript type generation from your Supabase-managed PostgreSQL database, and their client library provides a nice, albeit restrictive, auto-completion friendly, and type-safe developer experience. For anything beyond what the client library's API offers, you're left with writing raw SQL and using PostgreSQL drivers like `pg` or `postgres`.

Kysely (pronounced “Key-Seh-Lee”) is a type-safe and autocompletion-friendly TypeScript SQL query builder. Inspired by Knex. Mainly developed for Node.js but also runs on Deno and in the browser.

`kysely-supabase` is a toolkit (type translators for now) that allows using your existing Supabase setup with Kysely.
