/// <reference types="../types.d.ts" />

import { edenFetch } from "@elysiajs/eden";
import { type App } from "server/src";

export function useAnalytics<T extends Record<string, object> = Record<string, object>>(
	id: string,
	config: {
		/**
		 * Should errors be sent to the server?
		 * @default true
		 */
		errors: boolean;
	} = { errors: true },
) {
	const fetch = edenFetch<App>("http://localhost:3000");
	const analytics = {
		async track<E extends keyof T>(event: E, details: T[E]) {
			const response = await fetch("/analytics", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: { id, event: String(event), details },
			});

			if (response.data === null || response.data.success === false) {
				throw response.error || response.data.error;
			}

			return response.data;
		},
		async error(error: object) {
			const response = await fetch("/analytics", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: { id, event: "error", details: error },
			});

			if (response.data === null || response.data.success === false) {
				throw response.error || response.data.error;
			}

			return response.data;
		},
	};
	if (!("__has_analytics_error_set" in window) || window.__has_analytics_error_set === false) {
		// hack for hooks to work and not spam window.onerror
		window.__has_analytics_error_set = true;
		if (config.errors) {
			window.onerror = (message, source, lineno, colno, error) => {
				analytics
					.error({
						message,
						source,
						lineno,
						colno,
						error: error?.stack,
					})
					.catch(console.error);
			};
		}
	}
	return analytics;
}
