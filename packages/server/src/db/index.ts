import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "../env";
import * as schema from "./schema";

const options = {
	url: env.TURSO_URL,
	authToken: env.TURSO_API_KEY,
};

export const client = createClient(options);

export const db = drizzle(client, { schema, logger: true });
