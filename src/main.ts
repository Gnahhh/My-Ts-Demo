import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import 'normalize.css';
import '@/assets/css/reset.less';
import 'element-plus/theme-chalk/el-message.css';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.mount('#app');
