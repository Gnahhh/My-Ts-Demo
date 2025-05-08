// eslint.config.js
// import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
	// js.configs.recommended,
	{
		files: ['**/*.js', '**/*.ts', '**/*.vue'],
		plugins: {
			prettier: prettierPlugin
		},
		rules: {
			'prettier/prettier': 'error'
		}
	},
	prettier
];
