<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ElForm, FormRules } from 'element-plus';
import type { AccountLoginResult } from '@/types/login';

// 登录数据
const accountForm = reactive({
	account: '',
	password: ''
});

// 验证规则
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

// 登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>();
// const formRef = useTemplateRef<InstanceType<typeof ElForm>>('formRef');

const loginAction = async (): Promise<AccountLoginResult> => {
	try {
		const valid = await formRef.value?.validate();
		if (valid) {
			// 返回验证成功和表单数据
			return {
				valid: true,
				type: 'account',
				data: accountForm
			};
		} else {
			return { valid: false, type: 'account', data: null };
		}
	} catch (error) {
		return { valid: false, type: 'account', data: null };
	}
};

defineExpose({
	loginAction
});
</script>

<template>
	<div class="account-in">
		<el-form :model="accountForm" :rules="accountRules" status-icon ref="formRef">
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
</template>

<style lang="less" scoped>
.account-in {
	:deep(.el-form-item) {
		margin-bottom: @spacing-md;

		// 只添加输入框hover效果
		.el-input__wrapper {
			transition: all 0.2s ease;

			&:hover {
				box-shadow: 0 0 0 1px #409eff inset !important;
			}
		}
	}
}
</style>
