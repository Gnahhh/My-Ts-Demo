import hRequest from '@/service';
import { useLocalStorage } from '@/utils/handleStorage';
export function accountLogin(account: any) {
	return hRequest.post({
		url: '/login',
		data: account
	});
}

export function getUserInfoById(id: number) {
	const token = useLocalStorage('login').getItem<string>('token');
	return hRequest.get({
		url: `/role/${id}`
	});
}

export function getUserMenusByRoleId(roleId: number) {
	return hRequest.get({
		url: `/role/${roleId}/menu`
	});
}
