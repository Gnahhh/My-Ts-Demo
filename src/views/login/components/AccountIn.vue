<script lang="ts" setup>
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

const accountForm = reactive({
	account: '',
	password: ''
});

const accountRules: FormRules = {
	account: [
		{ required: true, message: '请输入账号', trigger: 'blur' },
		{ min: 3, max: 15, message: '账号长度在 3 到 15 个字符之间', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' }
	]
};
</script>

<template>
	<div class="account-in">
		<div class="phone-in">
			<el-form :model="accountForm" :rules="accountRules" status-icon>
				<el-form-item label="账号" required prop="account">
					<el-input v-model="accountForm.account" placeholder="请输入账号" />
				</el-form-item>
				<el-form-item label="密码" required prop="password">
					<el-input
						v-model="accountForm.password"
						show-password
						placeholder="请输入密码"
						type="password"
					/>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style lang="less" scoped>
.account-in {
	:deep(.el-form-item) {
		margin-bottom: @spacing-md;

		// 只添加输入框hover效果
		.el-input__wrapper {
			transition: all 0.2s ease;

			&:hover {
				box-shadow: 0 0 0 1px @color-primary inset !important;
			}
		}
	}
}
</style>
