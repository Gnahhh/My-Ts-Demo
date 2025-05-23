import { createRouter, createWebHashHistory } from 'vue-router';
import { useLocalStorage } from '@/utils/handleStorage';

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

// 路由守卫
router.beforeEach((to, from) => {
	const localStorage = useLocalStorage('login');
	const token = localStorage.getItem('token');

	if (to.path !== '/login' && !token) {
		return '/login';
	}

	if (to.path === '/login') {
		if (token) return '/home';
		return true;
	}
});

export default router;
