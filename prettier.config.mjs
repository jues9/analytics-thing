/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig} */
export default {
	tabWidth: 4,
	useTabs: true,
	printWidth: 115,
	arrowParens: "always",
	bracketSameLine: true,
	bracketSpacing: true,
	singleQuote: false,
	endOfLine: "lf",
	trailingComma: "all",
	semi: true,
	overrides: [{ files: ".hintrc", options: { parser: "json" } }],
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
