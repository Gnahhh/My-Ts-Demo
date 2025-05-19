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

export { AccountLoginResult, PhoneLoginResult };
