import { fetchUserList } from '@/service/modules/main/system/system';
import { defineStore } from 'pinia';
import type { User } from '@/types/system';

interface userStateType {
	userLists: User[];
	userAmount: number;
}

const useSystemStore = defineStore('system', {
	state: (): userStateType => ({
		userLists: [],
		userAmount: 0
	}),
	actions: {
		// 请求用户列表数据
		async getUserList() {
			const res = await fetchUserList();
			const { list, totalCount } = res.data;
			this.userAmount = totalCount;
			this.userLists.push(...list);
		}
	}
});

export default useSystemStore;
