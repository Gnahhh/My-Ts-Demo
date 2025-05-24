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
				localStorage.setItem('token', this.token);
				this.token = token;
				// 2.设置token
				// 3.获取用户权限
				const getedUserInfos = await getUserInfoById(id);
				this.userInfos = getedUserInfos.data;
				// console.log(getedUserInfos);
				// 4.获取用户菜单
				const getedUserMenus = await getUserMenusByRoleId(this.userInfos.id);
				this.userMenus = getedUserMenus.data;
				// 5.动态路由
				const routeList = routeMapper(this.userMenus);
				routeList.forEach(route => router.addRoute('Main', route));

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
		}
	},
	persist: {
		key: 'store',
		storage: localStorage,
		paths: ['id', 'name', 'userInfos', 'userMenus']
	} as any
});

export { useLoginStore };
