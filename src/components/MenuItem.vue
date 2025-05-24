<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store/modules/login/login';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import type { PropType } from 'vue';
import type { MenuResult } from '@/types/login';

// 引入路由和store
const router = useRouter();
const loginStore = useLoginStore();

const props = defineProps({
	item: {
		type: Object as PropType<MenuResult>,
		required: true
	},
	collapsed: {
		type: Boolean,
		default: false
	},
	level: {
		type: Number,
		default: 0
	}
});

const isExpanded = ref(false);

const toggleExpand = () => {
	if (props.item.children?.length) {
		isExpanded.value = !isExpanded.value;
	}
};

// 分割出来前端请求的icon名称
const sliceIconName = (name: string) => {
	return name.replace(/^el-icon-/, '');
};

// 过滤子菜单项 - 添加缺失的计算属性
const filteredChildren = computed(() => {
	return props.item.children || [];
});

// 增强版menuClick - 支持不同类型的菜单
const menuClick = (menu: MenuResult) => {
	if (!menu) return;

	// 处理不同类型菜单项
	switch (menu.type) {
		case 1: // 目录类型
			if (menu.url) {
				router.push(menu.url);
			}
			break;

		case 2: // 菜单类型
			if (menu.url) {
				router.push(menu.url);
			}
			break;

		case 3: // 按钮权限类型
			// 查找并导航到父菜单
			navigateToParentMenu(menu.parentId);
			break;

		default:
			if (menu.url) {
				router.push(menu.url);
			}
	}
};

// 查找父菜单并导航
const navigateToParentMenu = (parentId: number) => {
	if (!parentId) return;

	// 根据类型查找不同级别的父菜单
	const findParentWithUrl = (menuId: number) => {
		// 在全局菜单中查找
		const searchParent = (menus: MenuResult[], id: number): MenuResult | null => {
			for (const menu of menus) {
				if (menu.id === id) return menu;
				if (menu.children && menu.children.length) {
					const found = searchParent(menu.children, id);
					if (found) return found;
				}
			}
			return null;
		};

		const parent = searchParent(loginStore.userMenus, menuId);

		if (parent) {
			// 如果父菜单有URL，直接导航
			if (parent.url) {
				return parent;
			}
			// 否则递归查找其父菜单
			else if (parent.parentId) {
				return findParentWithUrl(parent.parentId);
			}
		}
		return null;
	};

	const parentMenu = findParentWithUrl(parentId);
	if (parentMenu?.url) {
		router.push(parentMenu.url);
	}
};
</script>

<template>
	<div class="menu-item-wrapper">
		<!-- 父菜单项 -->
		<div class="menu-parent-item" :class="{ 'menu-expanded': isExpanded }" @click="toggleExpand">
			<div class="menu-title">
				<el-icon class="menu-icon" v-if="sliceIconName(item.icon || '')">
					<component :is="sliceIconName(item.icon || '')" />
				</el-icon>
				<span class="menu-label" v-show="!collapsed">{{ item.name }}</span>
			</div>

			<el-icon class="menu-arrow" v-show="!collapsed && item.children?.length">
				<ArrowUpBold v-if="isExpanded" />
				<ArrowDownBold v-else />
			</el-icon>
		</div>
		<!-- 子菜单容器 -->
		<Transition name="expand">
			<div class="menu-children" v-show="isExpanded && !collapsed">
				<!-- 如果是叶子节点 -->
				<div
					v-if="!item.children?.[0]?.children?.length"
					v-for="(child, index) in filteredChildren"
					:key="index"
					@click.stop="menuClick(child)"
					:class="['menu-child-item', { 'permission-item': child.type === 3 }]"
				>
					{{ child.name }}
				</div>

				<!-- 如果还有子菜单，递归调用MenuItem -->
				<MenuItem
					v-else
					v-for="(child, inde) in item.children"
					:key="inde"
					:item="child"
					:collapsed="collapsed"
					:level="level + 1"
				/>
			</div>
		</Transition>
	</div>
</template>

<style lang="less">
.menu-item-wrapper {
	color: white;
	padding: 0.5rem 0.375rem;

	// 定义 父标签的样式
	.menu-parent-item {
		padding: 0.85rem 1rem;
		background-color: @color-primary-dark;
		border-left: 4px solid transparent;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		transition: all 0.25s ease;
		position: relative;

		// 左侧边界效果
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 0;
			background: @color-primary-lighter;
			opacity: 0.4;
			transition: width 0.3s ease;
			border-radius: 2px 0 0 2px;
		}

		// 底部分隔线
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 8%;
			right: 8%;
			height: 1px;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		// 悬停效果
		&:hover {
			background-color: rgba(75, 100, 165, 0.3);

			&::before {
				width: 4px;
			}

			&::after {
				opacity: 1;
			}

			.menu-icon {
				transform: scale(1.15);
				color: @color-primary-lighter;
			}
		}

		// 展开状态
		&.menu-expanded {
			background-color: @color-primary;
			border-left-color: @color-primary-lighter;

			&::before {
				width: 4px;
			}

			&::after {
				opacity: 1;
			}
		}

		.menu-title {
			display: flex;
			align-items: center;

			.menu-icon {
				font-size: 1.2rem;
				margin-right: 0.75rem;
				color: @color-info;
				transition: all 0.3s ease;
			}

			.menu-label {
				white-space: nowrap;
				font-weight: 500;
				font-size: 0.95rem;
				transition: color 0.2s ease;
				opacity: 1;
				transform: translateX(0);
				transition:
					opacity 0.3s,
					transform 0.3s;
			}
		}

		// 箭头图标
		.menu-arrow {
			transition: transform 0.3s ease;
			color: rgba(255, 255, 255, 0.6);

			&:hover {
				color: white;
			}
		}
	}

	// 权限菜单项特别样式
	.permission-item {
		color: #a8b1c2 !important;
		font-style: italic;

		&::before {
			background-color: #f1c40f !important;
		}
	}

	// 定义子标签的样式
	.menu-children {
		background-color: rgba(8, 20, 46, 0.9);
		box-shadow:
			inset 0 5px 5px -5px rgba(0, 0, 0, 0.2),
			inset 0 -5px 5px -5px rgba(0, 0, 0, 0.2);
		position: relative;
		border-left: 1px dashed rgba(255, 255, 255, 0.1);
		margin-left: 1rem;

		// 连接线
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			width: 1px;
			background: linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.05),
				rgba(255, 255, 255, 0.1) 50%,
				rgba(255, 255, 255, 0.05)
			);
		}

		// 子菜单项
		.menu-parent-item {
			padding-left: calc(1rem + 0.5rem * v-bind(level));
			background-color: rgba(18, 30, 56, 0.9);
			font-size: 0.95em;

			&::before {
				background: @color-info;
			}
		}

		// 叶子节点
		.menu-child-item {
			padding: 0.7rem 1rem 0.7rem 2.5rem;
			color: rgba(255, 255, 255, 0.75);
			transition: all 0.25s ease;
			position: relative;
			white-space: nowrap;
			font-size: 0.9em;
			cursor: pointer;
			border-bottom: 1px dotted rgba(255, 255, 255, 0.03);

			// 前置小圆点
			&::before {
				content: '';
				position: absolute;
				left: 1.2rem;
				top: 50%;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.3);
				transform: translateY(-50%);
				transition: all 0.25s ease;
			}

			// 悬停效果
			&:hover {
				background-color: rgba(255, 255, 255, 0.08);
				color: white;
				padding-left: 2.7rem;

				&::before {
					background-color: @color-primary-lighter;
					box-shadow: 0 0 5px @color-primary-lighter;
				}
			}

			&:active {
				background-color: rgba(0, 0, 0, 0.2);
			}
		}
	}

	// 折叠状态下的样式
	&:has(.menu-parent-item:has(.menu-label[style*='display: none'])) {
		.menu-parent-item {
			justify-content: center;
			padding: 0.85rem 0;

			.menu-icon {
				margin-right: 0;
				font-size: 1.3rem;
			}
		}
	}
}

// 展开/折叠动画
.expand-enter-active,
.expand-leave-active {
	transition: all 0.3s ease;
	max-height: 300px;
	overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
	max-height: 0;
	opacity: 0;
}
</style>
