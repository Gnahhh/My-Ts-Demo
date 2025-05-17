<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormRules } from 'element-plus';

import AccountIn from './AccountIn.vue';
import PhoneIn from './PhoneIn.vue';

// 切换登录方式
const activeName = ref('account');
const handleClick = (tab: any, event: Event) => {
	console.log(tab, event);
};

// 记住密码
const isRemPsd = ref([]);

// 登录
</script>

<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<!-- 切换账号模块 -->
		<div class="change-login">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="账号登录" name="account">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><UserFilled /></el-icon>
							<span>账号登录</span>
						</span>
					</template>
					<AccountIn />
				</el-tab-pane>
				<el-tab-pane label="手机登录" name="phone">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><Cellphone /></el-icon>
							<span>手机登录</span>
						</span>
					</template>
					<PhoneIn />
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 记住密码 -->
		<div class="remeber-box">
			<el-checkbox-group v-model="isRemPsd">
				<el-checkbox label="记住密码" value="" />
			</el-checkbox-group>
			<el-link type="primary">忘记密码</el-link>
		</div>
		<!-- 登录 -->
		<div class="login-btn">
			<el-button type="primary">登录</el-button>
		</div>
	</div>
</template>

<style lang="less" scoped>
.login-panel {
	width: 400px;
	padding: @spacing-xl;
	background-color: @color-background-light;
	border-radius: @border-radius-lg;
	box-shadow: @shadow-card;

	// 标题样式
	.title {
		margin-bottom: @spacing-xl;
		font-size: @font-size-h2;
		font-weight: @font-weight-bold;
		color: @color-text-primary;
		text-align: center;
	}

	// 切换账号模块
	.change-login {
		margin-bottom: @spacing-sm;

		// 标签页样式
		:deep(.el-tabs__nav) {
			display: flex;
			width: 100%;
		}

		:deep(.custom-tabs-label) {
			display: flex;
		}

		:deep(.el-tabs__item) {
			flex: 1;
			text-align: center;
			font-size: @font-size-md;
		}

		// 表单样式
		.login-table {
			padding: @spacing-md 0;
		}
	}

	// 记住密码
	.remeber-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: @spacing-sm 0;

		:deep(.el-checkbox) {
			height: auto; // 修复高度问题
			display: flex;
			align-items: center;
		}
	}

	// 登录按钮
	.login-btn {
		margin-top: @spacing-lg;

		:deep(.el-button) {
			width: 100%;
			height: @input-height-lg;
			font-size: @font-size-md;
		}
	}
}
</style>
