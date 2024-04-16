module.exports = {
	root: true,
	extends: ['klayr-base/ts'],
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	rules: {
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/member-ordering': 'off',
		'@typescript-eslint/no-unsafe-argument': 'warn',
	},
};
