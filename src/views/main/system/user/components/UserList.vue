<script lang="ts" setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import useSystemStore from '@/store/modules/main/system/system';
import { Edit, Delete } from '@element-plus/icons-vue';

const systemStore = useSystemStore();

const { userLists, userAmount } = storeToRefs(systemStore);

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

// 序号计算函数
const getTableIndex = (index: number) => {
	return (currentPage.value - 1) * pageSize.value + index + 1;
};

// 按钮操作传递行数据
const editUser = (row: any) => {
	console.log('修改用户:', row);
};

const delUser = (row: any) => {
	console.log('删除用户:', row);
};

// 分页功能
// 分页状态
const currentPage = ref(1);
const pageSize = ref(10);

// 缓存当前请求的页码
const requestedPages = ref(new Set<number>());

// 获取用户列表数据
const fetchUserList = async (searchParams?: any) => {
	try {
		// 当当前请求有缓存的时候 就不再重复请求
		if (requestedPages.value.has(currentPage.value)) return;
		await systemStore.getUserList({
			offset: (currentPage.value - 1) * pageSize.value,
			size: pageSize.value,
			...searchParams // 支持搜索参数
		});
		requestedPages.value.add(currentPage.value);
	} catch (error) {
		console.error('获取用户列表失败:', error);
	}
};

// 获取当前的页码的数据
const currentChange = (page: number) => {
	currentPage.value = page;
	fetchUserList();
};

// 每页条数改变处理
const sizeChange = (size: number) => {
	pageSize.value = size;
	currentPage.value = 1;
	requestedPages.value.clear(); // 清空缓存
	systemStore.clearUserList();
	fetchUserList();
};

// 展示分页数据
const currentPageUsers = computed(() => {
	const start = (currentPage.value - 1) * pageSize.value;
	const end = start + pageSize.value;
	return userLists.value.slice(start, end);
});

// 初始化数据
fetchUserList();
</script>

<template>
	<div class="user-list">
		<div class="header">
			<div class="title">用户列表</div>
			<div class="function"><el-button type="primary">新建数据</el-button></div>
		</div>
		<div class="content">
			<el-table
				:data="currentPageUsers"
				stripe
				:header-cell-style="{ background: '#f8fafc', color: '#1e293b', fontWeight: '600' }"
				:row-style="{ height: '56px' }"
				:cell-style="{ padding: '16px 0' }"
				class="modern-table"
			>
				<!-- 序号列 -->
				<el-table-column
					class-name="index-column"
					type="index"
					label="序号"
					:index="getTableIndex"
				/>
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
				<!-- 操作按钮 -->
				<el-table-column
					label="操作"
					header-align="center"
					align="center"
					width="160"
					fixed="right"
					class-name="action-column"
				>
					<template #default="{ row }">
						<div class="action-buttons">
							<el-button
								link
								type="primary"
								:icon="Edit"
								size="small"
								@click="editUser(row)"
								class="action-btn edit-btn"
							>
								编辑
							</el-button>
							<el-button
								link
								type="danger"
								:icon="Delete"
								size="small"
								@click="delUser(row)"
								class="action-btn delete-btn"
							>
								删除
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="pagination-container">
				<div class="pagination-info">
					<span class="total-text">共 {{ userAmount }} 条记录</span>
				</div>
				<div class="pagination-controls">
					<el-pagination
						v-model:current-page="currentPage"
						v-model:page-size="pageSize"
						:page-sizes="[10, 20, 50, 100]"
						:total="userAmount"
						:background="true"
						:small="false"
						layout="sizes, prev, pager, next, jumper"
						@current-change="currentChange"
						@size-change="sizeChange"
						class="pagination"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.user-list {
	// 头
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
		padding: 0 4px;

		.title {
			font-size: 1.75rem;
			font-weight: 700;
			color: #1e293b;
			letter-spacing: -0.025em;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: -4px;
				left: 0;
				width: 60px;
				height: 3px;
				background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
				border-radius: 2px;
			}
		}

		.function {
			:deep(.el-button) {
				border-radius: 8px;
				padding: 12px 24px;
				font-weight: 600;
				font-size: 14px;
				transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);

				&:hover {
					transform: translateY(-2px);
					box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4);
				}

				&:active {
					transform: translateY(0);
				}
			}
		}
	}

	// 内容
	.content {
		background: #ffffff;
		border-radius: 12px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
		overflow: hidden;
		border: 1px solid #f1f5f9;

		// 表格样式
		.el-table {
			width: 100%;
			border-radius: 8px 8px 0 0;

			// 确保表格自适应容器宽度
			:deep(colgroup) {
				col {
					width: auto !important;
				}
			}
		}

		// 🔥 分页容器样式 - 右对齐设计
		.pagination-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 24px;
			background: linear-gradient(135deg, #fafbfc 0%, #f5f6fa 100%);
			border-top: 1px solid #e4e7ed;
			min-height: 64px;

			// 左侧信息区域
			.pagination-info {
				display: flex;
				align-items: center;

				.total-text {
					color: #606266;
					font-size: 14px;
					font-weight: 500;
					letter-spacing: 0.3px;

					&::before {
						content: '📊';
						margin-right: 6px;
						font-size: 16px;
					}
				}
			}

			// 右侧分页控制区域
			.pagination-controls {
				display: flex;
				align-items: center;

				.pagination {
					// 🔥 分页组件样式优化
					:deep(.el-pagination) {
						display: flex;
						align-items: center;
						gap: 8px;

						// 每页条数选择器
						.el-pagination__sizes {
							margin-right: 12px;

							.el-select {
								.el-select__wrapper {
									border-radius: 8px;
									border: 1px solid #dcdfe6;
									transition: all 0.3s ease;
									background: #ffffff;
									box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

									&:hover {
										border-color: #c0c4cc;
										box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
									}

									&.is-focused {
										border-color: #409eff;
										box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
									}
								}
							}
						}

						// 页码按钮容器
						.el-pager {
							display: flex;
							align-items: center;
							gap: 4px;

							li {
								margin: 0;
								border-radius: 8px;
								border: 1px solid #dcdfe6;
								background: #ffffff;
								color: #606266;
								font-weight: 500;
								transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
								min-width: 40px;
								height: 40px;
								line-height: 38px;
								box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

								&:hover {
									color: #409eff;
									border-color: #409eff;
									transform: translateY(-2px);
									box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);
								}

								&.is-active {
									background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
									border-color: #409eff;
									color: #ffffff;
									font-weight: 600;
									box-shadow: 0 4px 12px rgba(64, 158, 255, 0.35);
									transform: translateY(-1px);
								}

								// 省略号样式
								&.more {
									border: none;
									background: transparent;
									color: #c0c4cc;
									box-shadow: none;

									&:hover {
										color: #409eff;
										transform: none;
										box-shadow: none;
									}
								}
							}
						}

						// 上一页/下一页按钮
						.btn-prev,
						.btn-next {
							margin: 0 6px;
							border-radius: 8px;
							border: 1px solid #dcdfe6;
							background: #ffffff;
							color: #606266;
							transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
							width: 40px;
							height: 40px;
							box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
							display: flex;
							align-items: center;
							justify-content: center;

							&:hover:not(:disabled) {
								color: #409eff;
								border-color: #409eff;
								transform: translateY(-2px);
								box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);
							}

							&:disabled {
								color: #c0c4cc;
								border-color: #e4e7ed;
								background: #f5f7fa;
								cursor: not-allowed;
								transform: none;
								box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
							}
						}

						// 跳转输入框
						.el-pagination__jump {
							margin-left: 16px;
							color: #606266;
							font-weight: 500;
							display: flex;
							align-items: center;
							gap: 8px;

							.el-input {
								width: 60px;

								.el-input__wrapper {
									border-radius: 8px;
									border: 1px solid #dcdfe6;
									transition: all 0.3s ease;
									background: #ffffff;
									box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

									&:hover {
										border-color: #c0c4cc;
										box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
									}

									&.is-focus {
										border-color: #409eff;
										box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
									}

									.el-input__inner {
										text-align: center;
										font-weight: 500;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
