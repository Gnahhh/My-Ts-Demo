<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import AccountIn from './AccountIn.vue';
import PhoneIn from './PhoneIn.vue';
import { useLoginStore } from '@/store/modules/login/login';
import router from '@/router';

// 获取store
const loginStore = useLoginStore();

// 切换登录方式
const activeName = ref('account');

// 登录状态
const loading = ref(false);

// 获取登录组件信息实现登录验证
const formRef = ref<InstanceType<typeof AccountIn> | InstanceType<typeof PhoneIn>>();

// 记住密码
const isRemPsd = ref(false);

// 验证错误警告
const errWorning = () => {
	ElMessage.error('请输入正确的账号或密码!');
};

// 登录
const handleLogin = async () => {
	loading.value = true;
	try {
		const result = await formRef.value?.loginAction();
		if (result?.valid) {
			// 根据当前登录方式处理
			if (result?.valid && result.type === 'account' && result.data) {
				let { account, password } = result.data;
				const res = await loginStore.loginAccountAction({ name: account, password });
				// console.log(res);
				if (res.success) {
					router.push('/main');
				}
			} else {
				console.log('手机登录:', result.data);
				// 调用手机登录API
				// const res = await userApi.phoneLogin({ ...result.data });
			}

			// 记住密码逻辑
			if (isRemPsd.value) {
				localStorage.setItem(
					'rememberLogin',
					JSON.stringify({
						type: activeName.value,
						data: result.data
					})
				);
			}
		} else {
			// console.log('错误信息');/
			errWorning();
			// console.log('错了');
		}
	} catch (err) {
		// console.error(err);
		// 显示登录错误信息
	} finally {
		loading.value = false;
	}
};

// 过度动画实现
const transitionDirection = ref('next');

// 监听标签页变化，决定动画方向
watch(activeName, (newValue, oldValue) => {
	if (newValue === 'phone' && oldValue === 'account') {
		// 从账号登录切换到手机登录 - 向前
		transitionDirection.value = 'next';
	} else {
		// 从手机登录切换回账号登录 - 向后
		transitionDirection.value = 'prev';
	}
});
</script>

<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<!-- 切换账号模块 -->
		<div class="change-login">
			<el-tabs v-model="activeName" class="demo-tabs">
				<el-tab-pane label="账号登录" name="account">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><UserFilled /></el-icon>
							<span>账号登录</span>
						</span>
					</template>
				</el-tab-pane>
				<el-tab-pane label="手机登录" name="phone">
					<template #label>
						<span class="custom-tabs-label">
							<el-icon><Cellphone /></el-icon>
							<span>手机登录</span>
						</span>
					</template>
				</el-tab-pane>
			</el-tabs>

			<!-- 添加动态组件和过渡效果 -->
			<div class="form-container">
				<Transition
					:name="transitionDirection === 'next' ? 'slide-next' : 'slide-prev'"
					mode="out-in"
				>
					<component
						:is="activeName === 'account' ? AccountIn : PhoneIn"
						:key="activeName"
						ref="formRef"
					/>
				</Transition>
			</div>
		</div>
		<!-- 记住密码 -->
		<div class="remeber-box">
			<el-checkbox label="记住密码" v-model="isRemPsd" />
			<el-link type="primary">忘记密码</el-link>
		</div>
		<!-- 登录 -->
		<div class="login-btn" @click="handleLogin">
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

		/* 添加动画样式 */
		.slide-next-enter-active,
		.slide-next-leave-active,
		.slide-prev-enter-active,
		.slide-prev-leave-active {
			transition: all 0.2s ease;
		}

		.slide-next-enter-from {
			opacity: 0;
			transform: translateX(30px);
		}

		.slide-next-leave-to {
			opacity: 0;
			transform: translateX(-30px);
		}

		.slide-prev-enter-from {
			opacity: 0;
			transform: translateX(-30px);
		}

		.slide-prev-leave-to {
			opacity: 0;
			transform: translateX(30px);
		}

		/* 确保表单容器正确定位 */
		.form-container {
			position: relative;
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
