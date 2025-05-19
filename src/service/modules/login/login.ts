import hRequestR from '@/service';
export function accountLogin(account: any) {
	return hRequestR.post({
		url: '/login',
		data: account
	});
}
