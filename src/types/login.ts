import { MenuTree } from './menu';

interface AccountLoginResult {
	valid: boolean;
	type: 'account';
	data: {
		account: string;
		password: string;
	} | null;
}

interface PhoneLoginResult {
	valid: boolean;
	type: 'phone'; // 添加类型标记，与account区分
	data: {
		phone: string;
		authCode: string;
	} | null;
}

// 用户信息接口
interface UserInfo {
	id: number;
	name: string; // 用户名称/角色名称
	intro: string; // 角色介绍/描述
	createAt: string; // 创建时间 (注意不是createdAt)
	updateAt: string; // 更新时间 (注意不是updatedAt)
	[key: string]: any; // 允许其他可能的属性
}

// 登录store的state类型
interface LoginState {
	id: number;
	token: string;
	name: string;
	userInfos: UserInfo;
	userMenus: MenuTree;
}

export { AccountLoginResult, PhoneLoginResult, UserInfo, LoginState, MenuTree };
