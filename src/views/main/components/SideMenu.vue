<script lang="ts" setup>
import MenuItem from '@/components/MenuItem.vue';
import { onMounted } from 'vue';

import { useLoginStore } from '@/store/modules/login/login';
import { storeToRefs } from 'pinia';

const loginStore = useLoginStore();
const { userMenus } = storeToRefs(loginStore);
// const userMenus = loginStore.userMenus;

const props = defineProps({
	collapsed: {
		type: Boolean,
		defult: false
	}
});
</script>

<template>
	<div class="side-menu">
		<div class="header">
			<img src="@/assets/img/管理.svg" alt="" />
			<h1 class="title" v-show="!collapsed">管理系统</h1>
		</div>
		<div class="menu">
			<!-- 使用循环MenuItem组件替代PullDownList -->
			<div class="pull-down-menu">
				<MenuItem v-for="item in userMenus" :key="item.id" :item="item" :collapsed="collapsed" />
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.side-menu {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: @color-primary-dark;
	width: 100%;
	box-shadow: 2px 0 8px rgba(15, 23, 42, 0.15);
	overflow-x: hidden;

	.header {
		padding: 1.5rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		position: relative;
		width: 100%;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 10%;
			right: 10%;
			height: 1px;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		}

		img {
			aspect-ratio: 1 / 1;
			margin-left: -15%;
			height: 80%;
			filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
			transition: transform 0.3s ease;

			&:hover {
				transform: scale(1.05);
			}
		}

		.title {
			overflow: hidden;
			font-size: 1.35rem;
			font-weight: 600;
			color: rgb(255, 255, 255);
			letter-spacing: 0.025em;
			text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
			white-space: nowrap;
			background: linear-gradient(to right, #ffffff, #e0e7ff);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	.menu {
		width: 100%;
		flex: 1;
		overflow-y: auto;
		padding-top: 0.75rem;

		/* 隐藏滚动条 - 兼容各浏览器 */
		-ms-overflow-style: none; /* IE/Edge */
		scrollbar-width: none; /* Firefox */

		/* Chrome, Safari, Opera等 */
		&::-webkit-scrollbar {
			display: none;
			width: 0;
			height: 0;
		}

		// // 修改PullDownList的样式
		// :deep(.pull-down-menu) {
		// 	.menu-parent-item {
		// 		padding: 0.85rem 1.25rem;
		// 		background-color: @color-primary-dark;
		// 		color: rgb(255, 255, 255);
		// 		border-left: 4px solid transparent;
		// 		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		// 		position: relative;

		// 		&::after {
		// 			content: '';
		// 			position: absolute;
		// 			bottom: 0;
		// 			left: 5%;
		// 			right: 5%;
		// 			height: 1px;
		// 			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
		// 			opacity: 0;
		// 			transition: opacity 0.3s ease;
		// 		}

		// 		&:hover {
		// 			background-color: @color-primary;
		// 			// transform: translateX(2px);
		// 			margin-left: 0.125rem;

		// 			&::after {
		// 				opacity: 1;
		// 			}

		// 			.menu-icon {
		// 				transform: scale(1.15);
		// 				color: @color-primary-lighter;
		// 			}
		// 		}

		// 		&.menu-expanded {
		// 			background-color: @color-primary;
		// 			border-left-color: @color-primary-lighter;
		// 			box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);

		// 			&::after {
		// 				opacity: 1;
		// 				background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
		// 			}
		// 		}
		// 		.menu-icon {
		// 			color: @color-info;
		// 			font-size: 1.2rem;
		// 			transition: all 0.3s ease;
		// 		}

		// 		.menu-label {
		// 			margin-left: 0.85rem;
		// 			font-weight: 500;
		// 			transition: color 0.2s ease;
		// 		}

		// 		.menu-arrow {
		// 			transition: transform 0.3s ease;
		// 		}

		// 		&:hover .menu-arrow {
		// 			// transform: translateX(-3px);
		// 			margin-left: -0.1875rem;
		// 		}

		// 		&.menu-expanded .menu-arrow {
		// 			color: @color-primary-lighter;
		// 		}
		// 	}

		// 	.menu-children {
		// 		background-color: rgb(8, 20, 46);
		// 		box-shadow:
		// 			inset 0 5px 5px -5px rgba(0, 0, 0, 0.2),
		// 			inset 0 -5px 5px -5px rgba(0, 0, 0, 0.2);

		// 		.menu-child-item {
		// 			padding: 0.7rem 1rem 0.7rem 3.2rem;
		// 			color: rgba(255, 255, 255, 0.75);
		// 			transition: all 0.25s ease;
		// 			position: relative;
		// 			text-align: left;

		// 			&::before {
		// 				content: '';
		// 				position: absolute;
		// 				left: 1.8rem;
		// 				top: 50%;
		// 				width: 5px;
		// 				height: 5px;
		// 				border-radius: 50%;
		// 				background-color: rgba(255, 255, 255, 0.3);
		// 				transform: translateY(-50%);
		// 				transition: all 0.25s ease;
		// 			}

		// 			&:hover {
		// 				background-color: rgba(255, 255, 255, 0.08);
		// 				color: rgb(255, 255, 255);
		// 				padding-left: 3.5rem;

		// 				&::before {
		// 					background-color: @color-primary-lighter;
		// 					box-shadow: 0 0 5px @color-primary-lighter;
		// 				}
		// 			}

		// 			&:active {
		// 				background-color: rgba(0, 0, 0, 0.2);
		// 			}
		// 		}
		// 	}
		// }
	}
}
</style>
