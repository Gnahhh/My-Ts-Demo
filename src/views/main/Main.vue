<script lang="ts" setup>
import ContentArea from './components/ContentArea.vue';
import SideMenu from './components/SideMenu.vue';
import HeaderBar from './components/HeaderBar.vue';

import { onMounted, ref } from 'vue';

// 控制侧边栏折叠祖杭太
const isCollapsed = ref(false);
</script>

<template>
	<div class="home">
		<SideMenu class="sider" :class="{ 'sider-collapsed': isCollapsed }" :collapsed="isCollapsed" />
		<div class="right-content">
			<HeaderBar class="header" v-model:collapsed="isCollapsed" />
			<ContentArea class="content" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.home {
	display: flex;
	height: 100%;

	.sider {
		width: 12.5rem;
		height: 100%;
		transition: all 0.3s;

		&.sider-collapsed {
			width: 4rem;
		}
	}

	.right-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.content {
			flex: 1;
			overflow-y: auto;
		}
	}
}
</style>
