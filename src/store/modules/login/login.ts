import { defineStore } from 'pinia';
import { useLocalStorage } from '@/utils/handleStorage';
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login/login';
import { routeMapper } from '@/utils/routeMapper';
import type { userResult, MenuResult } from '@/types/login';
import { ElMessage } from 'element-plus';
import router from '@/router';

const localStorage = useLocalStorage('login');

const useLoginStore = defineStore('login', {
	state: () => ({
		id: 0,
		token: localStorage.getItem('token') || ' ',
		name: '',
		userInfos: {} as userResult,
		userMenus: [] as MenuResult[]
	}),
	actions: {
		async loginAccountAction(account: any) {
			try {
				// 1.获取登录信息
				const res = await accountLogin(account);
				const { id, name, token } = res.data;
				this.id = id;
				this.name = name;
				this.token = token;
				localStorage.setItem('token', this.token);
				// 2.设置token
				// 3.获取用户权限
				const getedUserInfos = await getUserInfoById(id);
				this.userInfos = getedUserInfos.data;
				// console.log(getedUserInfos);
				// 4.获取用户菜单
				const getedUserMenus = await getUserMenusByRoleId(this.userInfos.id);
				this.userMenus = getedUserMenus.data;
				// 5.动态路由
				// const routeList = routeMapper(this.userMenus);
				// routeList.forEach(route => router.addRoute('Main', route));
				// // 6.匹配第一个路由
				// const firstRoute = this.findFirstValidRoute(this.userMenus);
				// console.log(firstRoute);
				// if (firstRoute) router.push(firstRoute);

				return { success: true };
			} catch (err) {
				ElMessage({
					type: 'error',
					message: '登录失败，请检查账号密码或网络连接',
					duration: 3000,
					showClose: true
				});
				localStorage.clearItems(true);
				// 使用Element Plus的错误提示
				return { success: false, err };
			}
		},

		// 添加查找第一个有效路由的辅助方法
		findFirstValidRoute(menus: MenuResult[]): string {
			// 默认路由
			const defaultRoute = '/main';

			// 递归查找第一个有效的菜单路由
			const findRoute = (items: MenuResult[]): string | null => {
				for (const item of items) {
					// 类型2是菜单项，有URL的菜单项是可导航的
					if (item.type === 2 && item.url) {
						return item.url;
					}

					// 如果当前项有子菜单，递归查找
					if (item.children && item.children.length > 0) {
						const childRoute = findRoute(item.children);
						if (childRoute) return childRoute;
					}
				}
				return null;
			};

			// 查找第一个路由
			const firstRoute = findRoute(menus);
			return firstRoute || defaultRoute;
		}
	},
	persist: {
		key: 'store',
		storage: localStorage,
		paths: ['id', 'name', 'userInfos', 'userMenus']
	} as any
});

export { useLoginStore };
