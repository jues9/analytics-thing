/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["isaacscript", "import"],
	ignorePatterns: ["**/node_modules/", "**/dist/", ".eslintrc.cjs"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: [
			"./packages/webui/tsconfig.json",
			"./packages/webui/tsconfig.node.json",
			"./packages/server/tsconfig.json",
			"./packages/example/tsconfig.json",
			"./packages/example/tsconfig.node.json",
			"./packages/client/tsconfig.json",
			"./tsconfig.node.json",
		],
	},
	rules: {
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
		],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ prefer: "type-imports", fixStyle: "inline-type-imports" },
		],
		"prettier/prettier": ["error", { endOfLine: "auto" }],
		"import/consistent-type-specifier-style": ["error", "prefer-inline"],
		"isaacscript/complete-sentences-jsdoc": "off",
		"isaacscript/format-jsdoc-comments": "off",
		"@typescript-eslint/no-confusing-void-expression": "off",
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/prefer-nullish-coalescing": "off",
	},
};
