import { type Config } from "drizzle-kit";
import { env } from "./src/env";

const dbCredentials = {
	url: env.TURSO_URL,
	authToken: env.TURSO_API_KEY,
};

export default {
	schema: "./src/db/schema.ts",
	driver: "turso",

	dbCredentials,

	verbose: true,
	strict: true,
	tablesFilter: ["!libsql_wasm_func_table"],
} satisfies Config;
