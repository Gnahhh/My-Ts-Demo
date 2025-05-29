<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { type FormRules, type FormInstance, ElMessage } from 'element-plus';

interface RuleForm {
	nickname: string;
	userName: string;
	phoneNumber: string;
	status: string;
	date: string[] | null;
}

// 表单引用
const formRef = ref<FormInstance>();

// 表单样式
const formInline = reactive<RuleForm>({
	nickname: '',
	userName: '',
	phoneNumber: '',
	status: '',
	date: null
});

// 表单验证

// 自定义验证函数：至少填写一个查询条件
const validateAtLeastOne = (rule: unknown, value: unknown, callback: (error?: Error) => void) => {
	const values = [
		formInline.nickname,
		formInline.userName,
		formInline.phoneNumber,
		formInline.status,
		formInline.date
	];

	// 检查是否有任何非空字段
	const hasValue = values.some(val => {
		if (Array.isArray(val)) return val.length > 0;
		return val !== '' && val !== null && val !== undefined;
	});

	if (hasValue) {
		callback();
	} else {
		callback(new Error('至少需要填写一个查询条件'));
	}
};

const rules = reactive<FormRules>({
	// 手机号码验证
	phoneNumber: [
		{
			pattern: /^1[3-9]\d{9}$/,
			message: '请输入正确的手机号码',
			trigger: 'blur'
		}
	],
	// // 自定义验证函数：确保至少一个字段不为空
	nickname: [
		{
			validator: validateAtLeastOne,
			trigger: 'change'
		}
	]
});

// 重置按钮点击
const onReset = () => {
	if (!formRef.value) return;
	formRef.value.resetFields();
	ElMessage.info('表单已重置');
};

// 提交按钮
const onSubmit = () => {
	if (!formRef.value) return;

	formRef.value.validate(valid => {
		if (valid) {
			// loading.value = true;

			// 模拟API请求
			setTimeout(() => {
				console.log('查询参数:', {
					nickname: formInline.nickname,
					userName: formInline.userName,
					phoneNumber: formInline.phoneNumber,
					status: formInline.status,
					date: formInline.date
				});

				ElMessage.success('查询成功');
				// loading.value = false;
			}, 800);
		} else {
			ElMessage.warning('请检查表单填写是否正确');
			return false;
		}
	});
};
</script>

<template>
	<div class="user">
		<el-form
			ref="formRef"
			:inline="true"
			:rules="rules"
			:model="formInline"
			class="demo-form-inline"
		>
			<el-form-item label="用户名" prop="nickname">
				<el-input v-model="formInline.nickname" placeholder="请输入查询的用户名" clearable />
			</el-form-item>
			<el-form-item label="真实姓名" prop="userName">
				<el-input v-model="formInline.userName" placeholder="请输入查询的真实姓名" clearable />
			</el-form-item>
			<el-form-item label="手机号码" prop="phoneNumber">
				<el-input v-model="formInline.phoneNumber" placeholder="请输入查询的手机号码" clearable />
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="formInline.status" placeholder="请选择状态">
					<el-option label="正常" value="0" />
					<el-option label="拉黑" value="1" />
				</el-select>
			</el-form-item>
			<el-form-item label="选择时间" prop="date">
				<el-date-picker
					v-model="formInline.date"
					type="daterange"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					clearable
				/>
			</el-form-item>
			<el-form-item class="form-actions">
				<el-button @click="onReset"
					><el-icon><Refresh /></el-icon><span>重置</span></el-button
				>
				<el-button type="primary" @click="onSubmit"
					><el-icon><Search /></el-icon><span>查询</span></el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="less" scoped>
.user {
	padding: 2.5rem;
	background-color: #fff;

	.demo-form-inline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));

		:deep(.el-form-item) {
			display: grid;
			grid-template-columns: 7.5rem minmax(13.75rem, 1fr); // 标签固定宽度120px，输入框占剩余空间
		}

		// 按钮区域的特殊样式
		.form-actions {
			display: flex;
			grid-column: 1 / -1; // 从第一列延伸到最后一列
			justify-self: end; // 在网格区域内右对齐

			.el-button {
				padding: 0.5rem 0.65rem;
			}
		}
	}
}
</style>
