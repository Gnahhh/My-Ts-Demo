import { defineStore } from 'pinia';
import { accountLogin } from '@/service/modules/login/login';
import { useLocalStorage } from '@/utils/handleStorage';
import router from '@/router';

const localStorage = useLocalStorage('login');

const useLoginStore = defineStore('login', {
	state: () => ({
		id: '',
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
