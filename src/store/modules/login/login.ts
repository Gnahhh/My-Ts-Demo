import { defineStore } from 'pinia';
import { useLocalStorage } from '@/utils/handleStorage';
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login/login';
import type { userResult, MenuResult } from '@/types/login';

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
				// 2.设置token
				localStorage.setItem('token', this.token);
				// // 3.获取用户权限
				const getedUserInfos = await getUserInfoById(id);
				this.userInfos = getedUserInfos.data;
				// // 4.获取用户菜单
				const getedUserMenus = await getUserMenusByRoleId(this.userInfos.id);
				this.userMenus = getedUserMenus.data;

				return { success: true };
			} catch (err) {
				console.error('登陆失败', err);
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
