export interface AccountLoginResult {
	valid: boolean;
	type: 'account';
	data: {
		account: string;
		password: string;
	} | null;
}

export interface PhoneLoginResult {
	valid: boolean;
	type: 'phone'; // 添加类型标记，与account区分
	data: {
		phone: string;
		authCode: string;
	} | null;
}

/// 定义接口类型
// 通用API响应接口
interface ApiResponse<T> {
	code: number;
	data: T;
}

// 登录结果数据接口
export interface LoginResult {
	id: number;
	name: string;
	token: string;
}

// 用户信息
export interface userResult {
	id: number;
	intro: string;
	name: string;
	createAt: string;
	updateAt: string;
}

// 菜单信息
// 菜单项接口
export interface MenuResult {
	id: number;
	name: string;
	type: number;
	url: string | null;
	sort: number | null;
	children?: MenuResult[] | null;
	parentId?: number;
	permission?: string;
	icon?: string;
}

export type LoginResponse = ApiResponse<LoginResult>;
export type UserResopnse = ApiResponse<userResult>;
// 菜单项联合类型 - 任何类型的菜单项
export type MenuResponse = ApiResponse<MenuResult[]>;
