import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const domains = sqliteTable("domains", {
	sqlite_id: integer("sqlite_id").primaryKey(),
	domain: text("domain").notNull(),
	id: text("id").unique().notNull(),
});

export const events = sqliteTable("events", {
	sqlite_id: integer("sqlite_id").primaryKey(),
	clientId: text("clientId")
		.notNull()
		.references(() => domains.id),
	event: text("event").notNull(),
	details: text("details", { mode: "json" }),
});

export const accounts = sqliteTable("accounts", {
	sqlite_id: integer("sqlite_id").primaryKey(),
	email: text("email").notNull(),
	password: text("password").notNull(),
});
