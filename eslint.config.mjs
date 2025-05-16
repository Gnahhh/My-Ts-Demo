// eslint.config.js
// import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

// 导入typescript eslint插件和解析器
import tseslint from 'typescript-eslint';

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
	// 添加TypeScript特定配置
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		},
		rules: {
			// 添加TS特定规则
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-explicit-any': 'warn'
			// 可以添加更多规则...
		}
	},
	prettier
];
