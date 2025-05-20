import { defineStore } from 'pinia';
import { useLocalStorage } from '@/utils/handleStorage';
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login/login';
import router from '@/router';
import type { UserInfo, LoginState, MenuTree } from '@/types/login';

const localStorage = useLocalStorage('login');

const useLoginStore = defineStore('login', {
	state: (): LoginState => ({
		id: 0,
		token: localStorage.getItem('token') ?? '',
		name: '',
		userInfos: {} as UserInfo,
		userMenus: {} as MenuTree
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
				// 3.获取用户权限
				const getedUserInfos = await getUserInfoById(id);
				this.userInfos = getedUserInfos.data;
				// 4.获取用户菜单
				const getedUserMenus = await getUserMenusByRoleId(this.userInfos.id);
				this.userMenus = getedUserMenus.data;

				router.push('/home');
				return { success: true };
			} catch (err) {
				console.error('登陆失败', err);
				return { success: false, err };
			}
		}
	}
});

export { useLoginStore };
