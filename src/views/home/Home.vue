<script lang="ts" setup>
import ContentArea from './components/ContentArea.vue';
import SideMenu from './components/SideMenu.vue';
import HeaderBar from './components/HeaderBar.vue';

import { ref } from 'vue';

// 控制侧边栏折叠祖杭太
const isCollapsed = ref(false);
const toggleSiderbar = () => {
	isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
	<div class="home">
		<SideMenu class="sider" :class="{ 'sider-collapsed': isCollapsed }" :collapsed="isCollapsed" />
		<div class="right-content">
			<HeaderBar class="header" @toggle="toggleSiderbar" />
			<ContentArea class="content" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.home {
	display: flex;
	height: 100%;

	.sider {
		width: 200px;
		height: 100%;
		background-color: red;
		transition: all 0.3s;

		&.sider-collapsed {
			width: 64px;
		}
	}

	// 平板设备断点
	@media (max-width: 992px) {
		.sider {
			width: 80px;

			&.sider-collapsed {
				width: 0;
				overflow: hidden;
			}
		}
	}

	.right-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: skyblue;

		.header {
			padding: 20px;
			background-color: orange;
		}

		.content {
			flex: 1;
			background-color: pink;
		}
	}
}
</style>
