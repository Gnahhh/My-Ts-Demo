import HRequest from './request';

import { BASE_URL, TIME_OUT } from './config';
import { useLocalStorage } from '@/utils/handleStorage';
// import { TOKEN } from '@/global/constance';
// import { localCache } from '@/utils/cache';

const hRequest = new HRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestSuccessFn: config => {
			// console.log(config);
			const token = useLocalStorage('login').getItem<string>('token');
			config.headers.Authorization = token;
			return config;
		}
	}
});
export default hRequest;
