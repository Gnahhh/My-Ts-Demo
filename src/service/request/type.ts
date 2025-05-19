import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// 扩展 AxiosRequestConfig类型
interface HInterceptors<T = AxiosResponse> {
	requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
	requestFailedFn?: (err: any) => any;
	responseSuccessFn?: (res: T) => T;
	responseFailedFn?: (err: any) => any;
}
interface HRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: HInterceptors<T>;
}
export default HRequestConfig;
