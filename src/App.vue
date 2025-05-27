<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 从路由路径中提取顶级路径
const topLevelPath = computed(() => {
	// 处理路径，获取第一级目录
	// console.log(route.path.split('/'));
	const pathParts = route.path.split('/').filter(Boolean);
	return pathParts[0] || 'root';
});
</script>

<template>
	<div class="container">
		<router-view v-slot="{ Component, route }">
			<component :is="Component" :key="topLevelPath"></component>
		</router-view>
		<!-- <h1>Vue 3 + Vite + TypeScript</h1>
		<HelloWorld msg="手动搭建的项目" />
		<div class="card">
			<button type="button" @click="count++">点击次数: {{ count }}</button>
		</div> -->
		<!-- <router-view v-slot="{ Component, route }">
			<component :is="Component"></component>
		</router-view>
		<RouterLink to="home">主页</RouterLink>
		<RouterLink :to="{ name: 'Login' }">登录</RouterLink> -->
	</div>
</template>

<style lang="less" scoped>
.container {
	height: 100%;
}
</style>
