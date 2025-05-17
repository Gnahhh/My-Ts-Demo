<script lang="ts" setup>
import LoginPane from './components/LoginPanel.vue';
</script>

<template>
	<div class="login">
		<LoginPane />
	</div>
</template>

<style lang="less" scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;

	transform: translateY(-8%);
}
</style>
