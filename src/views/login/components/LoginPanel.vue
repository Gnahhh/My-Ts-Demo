<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormRules } from 'element-plus';

// 切换登录方式
const activeName = ref('account');
const handleClick = (tab: any, event: Event) => {
	console.log(tab, event);
};

// 登录表单
const accountForm = reactive({
	account: '',
	password: '',
	phone: '',
	authCode: ''
});

// 表单验证规则
const accountRules: FormRules = {
	account: [
		{ required: true, message: '请输入账号', trigger: 'blur' },
		{ min: 3, max: 15, message: '账号长度在 3 到 15 个字符之间', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' }
	],
	phone: [
		{ required: true, message: '请输入手机号', trigger: 'blur' },
		{ pattern: /^[1][3-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
	],
	authCode: [
		{ required: true, message: '请输入验证码', trigger: 'blur' },
		{ len: 6, message: '验证码长度为6位', trigger: 'blur' }
	]
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
			<el-tabs v-model="activeName" 
			class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="账号登录" name="account">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><UserFilled /></el-icon>
							<span>账号登录</span>
						</span>
					</template>
					<div class="login-table">
						<el-form 
							:model="accountForm" 
							:rules="accountRules"
							status-icon
						>
							<el-form-item label="账号" required prop="account">
								<el-input v-model="accountForm.account" placeholder="请输入账号" />
							</el-form-item>
							<el-form-item label="密码" required prop="password">
								<el-input v-model="accountForm.password" show-password placeholder="请输入密码" type="password" />
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="手机登录" name="phone">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><Cellphone /></el-icon>
							<span>手机登录</span>
						</span>
					</template>
					<div class="login-table">
						<el-form :model="accountForm" :rules="accountRules">
							<el-form-item label="手机号" required prop="phone">
								<el-input v-model="accountForm.phone" placeholder="请输入手机号" />
							</el-form-item>
							<el-form-item label="验证码" required prop="authCode">
								<el-input v-model="accountForm.authCode" placeholder="请输入验证码" />
								<el-button type="primary" plain>获取验证码</el-button>
							</el-form-item>
						</el-form>
					</div>
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
			<el-button type="primary" >登录</el-button>
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

			:deep(.el-form) {
				// 表单项基本样式

				.el-form-item {
					align-items: center;
					margin-bottom: @spacing-md;

					// 表单标签样式
					.el-form-item__label {
						font-size: @font-size-sm;
						color: @color-text-secondary;
						padding-bottom: @spacing-xs;

						// 必填星号样式
						&::before {
							color: @color-danger;
							font-weight: @font-weight-bold;
						}
					}

					// 表单内容区域
					.el-form-item__content {
						line-height: 1;
					}
				}

				// 输入框样式
				.el-input {
					.el-input__wrapper {
						box-shadow: 0 0 0 1px @color-border inset !important;
						border-radius: @border-radius-md;
						padding: 0 @spacing-md;
						transition: all 0.2s @transition-ease;

						&:hover {
							box-shadow: 0 0 0 1px @color-primary-light inset !important;
						}

						&.is-focus {
							box-shadow: 0 0 0 1px @color-primary inset !important;
						}
					}

					.el-input__inner {
						// letter-spacing: 1px; // 调整字符间距
						height: @input-height-lg;
						font-size: @font-size-md;
						color: @color-text-primary;

						&::placeholder {
							color: @color-text-disabled;
							font-size: @font-size-sm;
						}
					}
				}

				// 验证码行布局（使用更可靠的选择器）
				.el-form-item:last-child .el-form-item__content {
					display: flex;
					align-items: center;
					gap: @spacing-md;

					.el-input {
						flex: 1;
					}

					.el-button {
						height: @input-height-lg;
						white-space: nowrap;
						flex-shrink: 0;
						min-width: 100px;
					}
				}
			}

			// 验证码变为一行
			:deep(.el-form-item:not(:has(.el-form-item__label))) > .el-form-item__content {
				flex-wrap: nowrap;
			}
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
