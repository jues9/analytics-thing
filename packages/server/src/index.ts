import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import * as openpgp from "openpgp";
import { db } from "./db";
import { accounts, domains, events } from "./db/schema";
import { env } from "./env";

async function encrypt(data: string) {
	return await openpgp.encrypt({
		message: await openpgp.createMessage({ text: new Bun.SHA512_256().update(data).digest("hex") }),
		format: "armored",
		passwords: [env.PGP_KEY],
	});
}

const app = new Elysia()
	.post(
		"/analytics",
		async ({ body, set }): Promise<{ success: true } | { success: false; error: string }> => {
			try {
				console.log(body);

				const headers = {} as Record<string, string>;
				headers["Content-Type"] = "application/json";
				const result = await db
					.select({
						id: domains.id,
						domain: domains.domain,
					})
					.from(domains)
					.where(eq(domains.id, body.id))
					.all();
				if (result.length > 0) {
					headers["Access-Control-Allow-Origin"] = result.map((r) => r.domain).join(", ");

					await db.insert(events).values({
						clientId: body.id,
						event: body.event,
						details: body.details,
					});

					set.headers = headers;
					set.status = 200;
					return { success: true };
				} else {
					headers["Access-Control-Allow-Origin"] = "*";
					set.status = 400;
					set.headers = headers;
					return { success: false, error: "Invalid ID" };
				}
			} catch (error) {
				console.error(error);
				set.status = 500;
				return { success: false, error: "Internal Server Error" };
			}
		},
		{
			body: t.Object({
				id: t.String(),
				event: t.String(),
				details: t.Unknown(),
			}),
		},
	)
	.options("/analytics", () => {
		const headers = new Headers();
		// deepcode ignore TooPermissiveCorsHeader: preflight headers
		headers.set("Access-Control-Allow-Origin", "*");
		headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
		headers.set("Access-Control-Allow-Headers", "Content-Type");
		headers.set("Access-Control-Max-Age", "86400");
		return new Response(null, { status: 204, headers });
	})
	.post(
		"/login",
		async ({ body, set }) => {
			const matchingemail = await db.select().from(accounts).where(eq(accounts.email, body.email)).all();
			if (matchingemail.length > 0) {
				const encrypted = await encrypt(body.password);
				if (matchingemail.filter((a) => a.password === encrypted).length > 0) {
					set.status = 200;
					return { success: true };
				} else {
					set.status = 400;
					return { success: false, error: "Invalid Password" };
				}
			} else {
				set.status = 400;
				return { success: false, error: "Invalid Email" };
			}
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
			}),
		},
	);
app.listen(3000, ({ port }) => console.log("Listening on http://localhost:" + port));

export type App = typeof app;
