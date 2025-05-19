import HRequest from './request';

import { BASE_URL, TIME_OUT } from './config';
// import { TOKEN } from '@/global/constance';
// import { localCache } from '@/utils/cache';

const hRequest = new HRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT
	// interceptors: {
	// 	requestSuccessFn: config => {
	// 		// 请求拦截加 token 每个请求都携带token
	// 		const token = localCache.getCache(TOKEN);
	// 		if (config.headers && token) {
	// 			//类型缩小
	// 			config.headers.Authorization = 'Bearer ' + token;
	// 		}
	// 		return config;
	// 	}
	// }
});
export default hRequest;
