<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(10);
const timer = ref<number | null>(null);

// 跳转到首页
const goToHome = () => {
	router.push('/main');
};

// 返回上一页
const goBack = () => {
	router.go(-1);
};

// 倒计时自动跳转
onMounted(() => {
	timer.value = window.setInterval(() => {
		countdown.value--;
		if (countdown.value <= 0) {
			clearInterval(timer.value as number);
			goToHome();
		}
	}, 1000);
});

// 组件销毁时清除定时器
onBeforeMount(() => {
	if (timer.value) {
		clearInterval(timer.value);
	}
});
</script>

<template>
	<div class="not-found-container">
		<div class="not-found-content">
			<div class="error-code">404</div>
			<div class="error-divider"></div>
			<div class="error-info">
				<h2>页面未找到</h2>
				<p>抱歉，您访问的页面不存在或已被移除</p>
				<p class="countdown-info">{{ countdown }}秒后将自动跳转到系统首页</p>
				<div class="action-buttons">
					<el-button type="primary" @click="goToHome">
						<el-icon><House /></el-icon>
						返回首页
					</el-button>
					<el-button @click="goBack">
						<el-icon><Back /></el-icon>
						返回上一页
					</el-button>
				</div>
			</div>
		</div>
		<div class="not-found-graphic">
			<div class="graphic-error">
				<div class="error-cloud-1"></div>
				<div class="error-cloud-2"></div>
				<div class="error-character">
					<div class="character-face">
						<div class="character-eye left"></div>
						<div class="character-eye right"></div>
						<div class="character-mouth sad"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.not-found-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f8f9fc;
	overflow: hidden;
	padding: 0 20px;
}

.not-found-content {
	display: flex;
	align-items: center;
	max-width: 800px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
	padding: 40px;
	animation: fadeInUp 0.8s ease-out;

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 30px 20px;
	}
}

.error-code {
	font-size: 120px;
	font-weight: 700;
	color: var(--el-color-primary, #409eff);
	margin-right: 30px;
	text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);

	@media (max-width: 768px) {
		font-size: 80px;
		margin-right: 0;
	}
}

.error-divider {
	width: 2px;
	height: 140px;
	background-color: #eee;
	margin: 0 30px;

	@media (max-width: 768px) {
		width: 80%;
		height: 2px;
		margin: 20px 0;
	}
}

.error-info {
	flex: 1;

	h2 {
		font-size: 28px;
		margin-top: 0;
		margin-bottom: 10px;
		color: #303133;
	}

	p {
		margin: 10px 0;
		color: #606266;
		font-size: 16px;
	}

	.countdown-info {
		font-size: 14px;
		color: #909399;
		margin-top: 20px;
		margin-bottom: 20px;
	}
}

.action-buttons {
	display: flex;
	gap: 15px;
	margin-top: 20px;

	@media (max-width: 480px) {
		flex-direction: column;
		width: 100%;
	}
}

.not-found-graphic {
	margin-top: 40px;
	position: relative;
	height: 200px;
}

// 动画关键帧
@keyframes float {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-15px);
	}
}

@keyframes cloudFloat {
	0%,
	100% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(20px);
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

// 可爱的404角色
.graphic-error {
	position: relative;
	width: 200px;
	height: 200px;
	animation: float 6s ease-in-out infinite;
}

.error-character {
	width: 100px;
	height: 100px;
	background-color: var(--el-color-primary, #409eff);
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
}

.character-face {
	position: relative;
	width: 100%;
	height: 100%;
}

.character-eye {
	position: absolute;
	width: 12px;
	height: 12px;
	background-color: #fff;
	border-radius: 50%;
	top: 35px;

	&.left {
		left: 30px;
	}

	&.right {
		right: 30px;
	}
}

.character-mouth {
	position: absolute;
	width: 40px;
	height: 20px;
	border: 3px solid #fff;
	border-radius: 0 0 20px 20px;
	border-top: none;
	bottom: 25px;
	left: 50%;
	transform: translateX(-50%);

	&.sad {
		border-radius: 20px 20px 0 0;
		border-bottom: none;
		border-top: 3px solid #fff;
		top: 60px;
	}
}

.error-cloud-1,
.error-cloud-2 {
	position: absolute;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 50px;
}

.error-cloud-1 {
	width: 80px;
	height: 30px;
	top: 20px;
	left: -40px;
	animation: cloudFloat 8s ease-in-out infinite;
}

.error-cloud-2 {
	width: 60px;
	height: 25px;
	top: 40px;
	right: -30px;
	animation: cloudFloat 10s ease-in-out infinite reverse;
}
</style>
