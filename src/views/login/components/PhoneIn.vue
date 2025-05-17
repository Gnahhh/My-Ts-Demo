<script lang="ts" setup>
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

const accountForm = reactive({
	phone: '',
	authCode: ''
});

const accountRules: FormRules = {
	phone: [
		{ required: true, message: '请输入手机号', trigger: 'blur' },
		{ pattern: /^[1][3-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
	],
	authCode: [
		{ required: true, message: '请输入验证码', trigger: 'blur' },
		{ len: 6, message: '验证码长度为6位', trigger: 'blur' }
	]
};
</script>

<template>
	<div class="phone-in">
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
</template>

<style lang="less" scoped>
.phone-in {
	:deep(.el-form-item) {
		margin-bottom: @spacing-md;

		// 输入框hover效果
		.el-input__wrapper {
			transition: all 0.2s ease;

			&:hover {
				box-shadow: 0 0 0 1px @color-primary inset !important;
			}
		}

		.el-form-item__content:has(button) {
			flex-wrap: nowrap;
		}

		button {
			margin-left: 10px;
		}
	}
}
</style>
