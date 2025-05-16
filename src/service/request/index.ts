import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { HYRequestConfig, HYRequestInterceptors } from './type';

class HYRequest {
	instance: AxiosInstance;

	interceptors?: HYRequestInterceptors;

	constructor(config: HYRequestConfig) {
		//创建axios实例

		this.instance = axios.create(config); //保存基本信息

		this.interceptors = config.interceptors; //使用拦截器
		//从config钟取出的拦截器是对应的实例的拦截器

		this.instance.interceptors.request.use(
			// this.interceptors?.requestInterceptor,

			this.interceptors?.requestInterceptorCatch
		);

		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,

			this.interceptors?.requestInterceptorCatch
		); //所有的实例都有的拦截器

		this.instance.interceptors.request.use(
			config => {
				console.log('所有的实例都有的拦截器: 请求拦截成功');
				return config;
			},

			err => {
				console.log('所有的实例都有的拦截器: 请求拦截失败');

				return err;
			}
		);

		this.instance.interceptors.response.use(
			res => {
				console.log('所有的实例都有的拦截器: 响应拦截成功');

				return res.data;
			},

			err => {
				console.log('所有的实例都有的拦截器: 响应拦截失败'); //例子:判断不同httpErrorCode显示不同错误信息

				if (err.response.status === 404) {
					console.log('404错误~');
				}

				return err;
			}
		);
	}

	request<T>(config: HYRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			//单个请求对请求config的处理

			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config);
			}

			this.instance

				.request<any, T>(config)

				.then(res => {
					//单个请求对数据的处理

					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res);
					}

					console.log(res); //将结果返回出去

					resolve(res);
				})

				.catch(err => {
					reject(err);

					return err;
				});
		});
	}

	get<T>(config: HYRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' });
	}

	post<T>(config: HYRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' });
	}

	delete<T>(config: HYRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' });
	}

	patch<T>(config: HYRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' });
	}
}

export default HYRequest;
