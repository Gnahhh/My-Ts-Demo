<script lang="ts" setup>
import { reactive, ref } from 'vue';

const props = defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:collapsed']);

// 折叠
const toggleSidebar = () => {
	emit('update:collapsed', !props.collapsed);
};

// 导航信息

// 用户信息
const informClick = () => {
	console.log('通知点击');
};
const messageClick = () => {
	console.log('消息点击');
};
const infoClick = () => {
	console.log('用户点击');
};

const userInfos = reactive({
	id: 1,
	name: 'hang',
	avatorUrl: 'https://picsum.photos/200'
});

// 控制菜单显示
const showUserMenu = ref(false);
</script>

<template>
	<div class="header-bar">
		<div class="nav-bar">
			<div class="fold-btn" @click="toggleSidebar">
				<el-icon v-if="!collapsed"><Fold /></el-icon>
				<el-icon v-else><Expand /></el-icon>
			</div>
			<div class="crumb">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/abc' }">homepage</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/efg' }">homepage1</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/home' }">homepage2</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="user-information">
			<div class="inform">
				<el-icon @click="informClick"><BellFilled /></el-icon>
				<el-icon @click="messageClick"><ChatDotRound /></el-icon>
				<el-icon @click="infoClick"><Postcard /></el-icon>
			</div>
			<div class="info" @mouseenter="showUserMenu = true" @mouseleave="showUserMenu = false">
				<img class="avator" :src="userInfos.avatorUrl" alt="Random image" />
				<span class="name">{{ userInfos.name }}</span>
				<div class="user-menu" v-show="showUserMenu">
					<div class="menu-item" @click="goToProfile">
						<el-icon><User /></el-icon>
						<span>个人中心</span>
					</div>
					<div class="menu-item" @click="goToSettings">
						<el-icon><Setting /></el-icon>
						<span>账户设置</span>
					</div>
					<div class="menu-divider"></div>
					<div class="menu-item logout" @click="handleLogout">
						<el-icon><SwitchButton /></el-icon>
						<span>退出登录</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
// 整个栏的样式
.header-bar {
	padding: 0.625rem 1.8rem 0.625rem 1.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	border-bottom: 1px solid @color-divider;

	// 面包屑导航栏以及点击按钮的样式
	.nav-bar {
		display: flex;
		align-items: center;
		vertical-align: middle;

		// 按钮
		.fold-btn {
			display: flex;
			align-items: center;
			cursor: pointer;
			font-size: 1.5rem;
			margin-right: 0.875rem;
		}

		// 面包屑
		.crumb {
			display: flex;
			align-items: center;
		}
	}

	// 用户信息集合
	.user-information {
		display: flex;
		align-items: center;

		// 通知icon
		.inform {
			display: flex;
			align-items: center;

			> * {
				margin: 0.5rem;
				font-size: 1.125rem;
				transition: all 0.2s ease;
				cursor: pointer;

				&:hover {
					color: @color-primary;
					transform: scale(1.1);
				}
			}

			> :last-child {
				margin-right: 0.5rem + 0.5rem;
			}
		}

		// 用户信息
		.info {
			display: flex;
			align-items: center;
			position: relative;
			cursor: pointer;

			.avator {
				aspect-ratio: 1 / 1;
				width: 1.75rem;
				border-radius: 50%;
			}

			.name {
				margin-left: 0.25rem;
				font-weight: 500;
				color: @color-text-primary;
			}

			&::after {
				content: '';
				display: inline-block;
				margin-left: 0.5rem;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 5px 5px 0 5px;
				border-color: @color-text-secondary transparent transparent;
				transition: transform 0.2s;
			}

			&:hover::after {
				transform: rotate(180deg);
				border-color: @color-primary transparent transparent;
			}

			.user-menu {
				position: absolute;
				top: 150%;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 4px;
				background-color: white;
				box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 添加阴影增加层次感 */

				/* 添加连接桥梁，扩大可点击区域 */
				&::before {
					content: '';
					position: absolute;
					top: -0.9375rem; /* 消除菜单和触发区之间的间隙 */
					left: 0;
					right: 0;
					height: 0.9375rem;
					background: transparent; /* 视觉上不可见 */
				}

				.menu-item {
					white-space: nowrap; /* 防止文本换行 */
					padding: 8px 16px;
					display: flex;
					align-items: center;
					cursor: pointer;

					.el-icon {
						margin-right: 0.0625rem;
						transform: translateY(0.0625rem);
					}

					&:hover {
						background-color: #f5f7fa;
					}

					&:last-child:hover {
						background-color: rgba(185, 28, 28, 0.08);
						color: @color-danger;
					}
				}
				.menu-divider {
					height: 1px;
					padding: 0;
					margin: 5px 0;
					background-color: #ebeef5;
				}
			}
		}
	}
}
</style>
