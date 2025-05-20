import { defineStore } from 'pinia';
import { useLocalStorage } from '@/utils/handleStorage';
import { accountLogin, getUserInfoById } from '@/service/modules/login/login';
import router from '@/router';

const localStorage = useLocalStorage('login');

const useLoginStore = defineStore('login', {
	state: () => ({
		id: 0,
		token: localStorage.getItem('token') ?? '',
		name: ''
	}),
	actions: {
		async loginAccountAction(account: any) {
			try {
				const res = await accountLogin(account);
				const { id, name, token } = res.data;
				this.id = id;
				this.name = name;
				this.token = token;
				localStorage.setItem('token', this.token);
				const userInfo = await getUserInfoById(id);
				console.log(userInfo);
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
