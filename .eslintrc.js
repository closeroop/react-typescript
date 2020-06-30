module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		'plugin:prettier/recommended',
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 6,
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"react",
		"prettier"
	],
	"rules": {
		'prettier/prettier': 1,
		'@typescript-eslint/no-unused-vars': 1,
		'@typescript-eslint/no-empty-function': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-non-null-assertion': 0  // ! 断言
	}
};