<script lang="ts" setup>
import PullDownList from '@/components/PullDownList.vue';
</script>

<template>
	<div class="side-menu">
		<!-- <h1>side-menu</h1> -->
		<div class="header">
			<img src="@/assets/img/管理.svg" alt="" />
			<h1 class="title">管理系统</h1>
		</div>
		<div class="menu">
			<PullDownList />
		</div>
	</div>
</template>

<style lang="less" scoped>
.side-menu {
	display: flex;
	flex-direction: column;
	align-items: center;

	.header {
		display: flex;
		align-items: center;

		img {
			aspect-ratio: 1 / 1;
			margin-left: -15%;
			height: 80%;
		}

		.title {
			font-size: 1rem;
			font-weight: bolder;
			color: white;
			// background-color: #fff;
		}
	}

	.menu {
		width: 100%;
	}
}
</style>
