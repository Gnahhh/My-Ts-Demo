import hRequest from '@/service';
import { LoginResponse, UserResopnse, MenuResponse } from '@/types/login';

export function accountLogin(account: any) {
	return hRequest.post<LoginResponse>({
		url: '/login',
		data: account
	});
}

export function getUserInfoById(id: number) {
	return hRequest.get<UserResopnse>({
		url: `/role/${id}`
	});
}

export function getUserMenusByRoleId(roleId: number) {
	return hRequest.get<MenuResponse>({
		url: `/role/${roleId}/menu`
	});
}
