import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

import path from 'path';

export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import "@/assets/css/variable.less";`,
				javascriptEnabled: true
			}
		}
	}
});
