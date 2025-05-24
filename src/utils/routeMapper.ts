import type { RouteRecordRaw } from 'vue-router';
import type { MenuResult } from '@/types/login';

// 获取路由的path以及组件
function loadLocalRoutes() {
	const modules: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
		eager: true
	});

	// 1.获取所有的路由地址
	const localRoutes: RouteRecordRaw[] = [];

	for (let key in modules) {
		const value = modules[key];
		localRoutes.push(value.default);
	}
	return localRoutes;
}

// 动态加载路由
export function routeMapper(menuList: MenuResult[]) {
	// 获取路由列表
	const localRoutes = loadLocalRoutes();

	// 需要创建的路由列表
	const createRoutes: RouteRecordRaw[] = [];
	// 遍历接口的url
	for (let menu of menuList) {
		if (!menu.children) continue;
		// 进行匹配
		for (let child of menu.children) {
			const route = localRoutes.find(item => item.path == child.url);
			if (!route) continue;
			createRoutes.push(route);
		}
	}

	return createRoutes;
}
