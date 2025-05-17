<script setup lang="ts"></script>
,
<template>
	<div class="container">
		<router-view v-slot="{ Component, route }">
			<component :is="Component" :key="route.path"></component>
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
