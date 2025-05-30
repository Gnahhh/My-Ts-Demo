<script lang="ts" setup>
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import useSystemStore from '@/store/modules/main/system/system';
import { Edit, Delete } from '@element-plus/icons-vue';

const systemStore = useSystemStore();
systemStore.getUserList();

const { userLists } = storeToRefs(systemStore);

// 字段映射配置
const columnMapping = {
	// id: 'ID',
	name: '用户名',
	realname: '真实姓名',
	cellphone: '手机号码',
	enable: '状态',
	// departmentId: '部门ID',
	// roleId: '角色ID',
	createAt: '创建时间',
	updateAt: '更新时间'
};

// 生成表格列配置
const columns = Object.entries(columnMapping).map(([key, label]) => ({
	prop: key,
	label
}));

// 格式化日期函数
// 使用dayjs格式化日期
const formatDate = (dateString: string) => {
	if (!dateString) return '';
	return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
};

// const columns = Object.entries(columnMapping).map(([key, label]) => ({
// 	prop: key,
// 	label
// }));

// 按钮操作
const editUser = () => {
	console.log('修改');
};

const delUser = () => {
	console.log('删除');
};
</script>

<template>
	<div class="user-list">
		<div class="header">
			<div class="title">用户列表</div>
			<div class="function"><el-button type="primary">新建数据</el-button></div>
		</div>
		<div class="content">
			<el-table :data="userLists">
				<!-- 序号列 -->
				<el-table-column type="index" label="序号" />
				<el-table-column
					v-for="column in columns"
					:key="column.prop"
					:prop="column.prop"
					:label="column.label"
				>
					<!-- 添加日期格式化的模板 -->
					<template #default="{ row }" v-if="column.prop.includes('At')">
						{{ formatDate(row[column.prop]) }}
					</template>
					<!-- 状态字段处理 -->
					<template #default="{ row }" v-else-if="column.prop === 'enable'">
						<el-tag :type="row[column.prop] === 1 ? 'success' : 'danger'" size="small">
							{{ row[column.prop] === 1 ? '启用' : '禁用' }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" header-align="center">
					<template #default>
						<el-button link type="primary" :icon="Edit" size="small" @click="editUser">
							编辑
						</el-button>
						<el-button link type="danger" :icon="Delete" size="small" @click="delUser"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style lang="less" scoped>
.user-list {
	.header {
		display: flex;
		justify-content: space-between;

		.title {
			font-size: 1.25rem;
			font-weight: 800;
		}
	}

	.content {
		overflow: auto;

		.el-table {
			width: 100%;

			// 确保表格自适应容器宽度
			:deep(colgroup) {
				col {
					width: auto !important;
				}
			}
		}
	}
}
</style>
