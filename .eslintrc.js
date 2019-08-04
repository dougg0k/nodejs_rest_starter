module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'security'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'plugin:security/recommended',
	],
	parserOptions: {
		ecmaVersion: 2018,
		project: './tsconfig.json',
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-unused-vars': 0,
		'@typescript-eslint/explicit-function-return-type': [
			'warn',
			{
				allowExpressions: true,
			},
		],
	},
};
