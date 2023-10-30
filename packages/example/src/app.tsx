import { useAnalytics } from "client/src";
import { type JSX } from "preact";
import { useEffect } from "preact/hooks";

const analyticsId = "testing";

export function App(): JSX.Element {
	const analytics = useAnalytics(analyticsId);

	useEffect(() => {
		window.onerror = (message, source, lineno, colno, error) => {
			analytics
				.track("error", {
					message,
					source,
					lineno,
					colno,
					error,
				})
				.then(console.log)
				.catch(console.error);
		};
	}, []);

	return (
		<div>
			<button
				onClick={() => {
					analytics
						.track("test", {
							foo: "bar",
						})
						.then(console.log)
						.catch(console.error);
				}}>
				Send example event
			</button>
			<button
				onClick={() => {
					throw new Error("Test error");
				}}>
				Test error
			</button>
		</div>
	);
}
