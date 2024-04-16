module.exports = {
	extends: ['klayr-base/ts-jest'],
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	rules: {
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/no-misused-promises': 'off',
	},
};
