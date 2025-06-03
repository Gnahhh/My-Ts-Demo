import hRequest from '@/service';

interface FetchUserListParams {
	offset: number;
	size: number;
	// 其他搜索参数
	name?: string;
	status?: number;
}

export const fetchUserList = function (params: FetchUserListParams) {
	return hRequest.post({
		url: '/users/list',
		data: {
			offset: params.offset ?? 0,
			size: params.size ?? 10
		}
	});
};
