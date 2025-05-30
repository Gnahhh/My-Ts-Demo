import hRequest from '@/service';

export const fetchUserList = function () {
	return hRequest.post({
		url: '/users/list',
		data: {
			offset: 0,
			size: 10
		}
	});
};
