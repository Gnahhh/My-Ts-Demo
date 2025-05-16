import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('../views/not-found/NotFound.vue')
		},
		{
			path: '/home',
			name: 'Home',
			component: () => import('../views/home/Home.vue')
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/login/Login.vue')
		}
	]
});

export default router;
