import { fetchUserList } from '@/service/modules/main/system/system';
import { defineStore } from 'pinia';
import type { User } from '@/types/system';

// 用户数据接口
interface userStateType {
	userLists: User[];
	userAmount: number;
}
// 分页参数接口
interface PageParams {
	offset: number;
	size: number;
	// 可以扩展搜索参数
	searchParams?: Record<string, any>;
}

const useSystemStore = defineStore('system', {
	state: (): userStateType => ({
		userLists: [],
		userAmount: 0
	}),
	actions: {
		// 请求用户列表数据
		async getUserList(params: PageParams) {
			const res = await fetchUserList(params);
			const { list, totalCount } = res.data;
			this.userAmount = totalCount;
			this.userLists.push(...list);
		},
		// 清除
		clearUserList() {
			this.userLists = [];
			this.userAmount = 0;
		}
	}
});

export default useSystemStore;
