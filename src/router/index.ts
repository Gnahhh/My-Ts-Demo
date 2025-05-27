import { createRouter, createWebHashHistory } from 'vue-router';
import { useLoginStore } from '@/store/modules/login/login';
import { useLocalStorage } from '@/utils/handleStorage';

import { routeMapper } from '@/utils/routeMapper';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('../views/not-found/NotFound.vue')
		},
		{
			path: '/main',
			name: 'Main',
			component: () => import('../views/main/Main.vue')
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/login/Login.vue')
		}
	]
});

// 路由是否已添加标志，避免重复添加
let dynamicRoutesAdded = false;

// 路由守卫
router.beforeEach((to, from) => {
	const loginStore = useLoginStore();

	const localStorage = useLocalStorage('login');
	const token = localStorage.getItem('token');

	// 未登录处理
	if (to.path !== '/login' && !token) {
		return '/login';
	}

	// 已登录且前往登录页
	if (to.path === '/login') {
		if (token) return '/main';
		return true;
	}

	// 处理已登录但需要添加路由的情况
	if (token && !dynamicRoutesAdded) {
		// 检查是否有菜单数据（通过Pinia持久化恢复）
		if (loginStore.userMenus && loginStore.userMenus.length > 0) {
			// 映射菜单到路由
			const routes = routeMapper(loginStore.userMenus);
			// 添加路由
			routes.forEach(route => {
				if (!router.hasRoute(route.name as string)) {
					router.addRoute('Main', route);
				}
			});

			// 标记路由已添加
			dynamicRoutesAdded = true;

			// 如果进入的是需要添加的动态路由，重新导航以确保正确匹配
			if (to.name === 'NotFound' || to.matched.length === 0) {
				// replace:true 不会留下历史记录
				return { path: to.fullPath, replace: true };
			}
		}
	}
});

export default router;
