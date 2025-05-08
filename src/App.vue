<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const count = ref(0);
</script>

<template>
	<div class="container">
		<h1>Vue 3 + Vite + TypeScript</h1>
		<HelloWorld msg="手动搭建的项目" />
		<div class="card">
			<button type="button" @click="count++">点击次数: {{ count }}</button>
		</div>
	</div>
</template>

<style scoped>
.container {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	text-align: center;
}

.card {
	padding: 2em;
}

button {
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	background-color: #f9f9f9;
	cursor: pointer;
	transition: border-color 0.25s;
}

button:hover {
	border-color: #646cff;
}
</style>
