<script lang="ts" setup>
import { PropType, ref } from 'vue';
import type { MenuResult } from '@/types/login';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';

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
</script>

<template>
	<div class="menu-item-wrapper">
		<!-- 父菜单项 -->
		<div class="menu-parent-item" :class="{ 'menu-expanded': isExpanded }" @click="toggleExpand">
			<div class="menu-title">
				<el-icon class="menu-icon">
					<component :is="sliceIconName(item.icon || '')" />
				</el-icon>
				<span class="menu-label" v-show="!collapsed">{{ item.name }}</span>
			</div>

			<el-icon class="menu-arrow" v-show="!collapsed && item.children?.length">
				<ArrowUpBold v-if="isExpanded" />
				<ArrowDownBold v-else />
			</el-icon>
		</div>
	</div>

	<!-- 子菜单容器 -->
	<Transition name="expand">
		<div class="menu-children" v-show="isExpanded && !collapsed">
			<!-- 如果是叶子节点 -->
			<div
				v-if="!item.children?.[0]?.children?.length"
				v-for="(child, index) in item.children"
				:key="index"
				class="menu-child-item"
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
</template>

<style lang="less">
.menu-item-wrapper {
	width: 100%;

	.menu-parent-item {
		padding: 0.85rem 1.25rem;
		background-color: @color-primary-dark;
		color: rgb(255, 255, 255);
		border-left: 4px solid transparent;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 5%;
			right: 5%;
			height: 1px;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		&:hover {
			background-color: @color-primary;
			margin-left: 0.125rem;

			&::after {
				opacity: 1;
			}

			.menu-icon {
				transform: scale(1.15);
				color: @color-primary-lighter;
			}
		}

		&.menu-expanded {
			background-color: @color-primary;
			border-left-color: @color-primary-lighter;
			box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);

			&::after {
				opacity: 1;
				background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
			}
		}

		.menu-title {
			display: flex;
			align-items: center;

			.menu-icon {
				color: @color-info;
				font-size: 1.2rem;
				transition: all 0.3s ease;
			}

			.menu-label {
				margin-left: 0.85rem;
				font-weight: 500;
				transition: color 0.2s ease;
				white-space: nowrap;
			}
		}

		.menu-arrow {
			transition: transform 0.3s ease;
		}

		&:hover .menu-arrow {
			margin-left: -0.1875rem;
		}

		&.menu-expanded .menu-arrow {
			color: @color-primary-lighter;
		}
	}

	.menu-children {
		background-color: rgb(8, 20, 46);
		box-shadow:
			inset 0 5px 5px -5px rgba(0, 0, 0, 0.2),
			inset 0 -5px 5px -5px rgba(0, 0, 0, 0.2);

		/* 子菜单的缩进逻辑 */
		.menu-parent-item {
			padding-left: calc(1.25rem + 1.3rem);
		}

		/* 嵌套多级菜单的缩进 */
		.menu-children .menu-parent-item {
			padding-left: calc(1.25rem + 2.6rem);
		}

		.menu-child-item {
			padding: 0.7rem 1rem 0.7rem 3.2rem;
			color: rgba(255, 255, 255, 0.75);
			transition: all 0.25s ease;
			position: relative;
			text-align: left;

			&::before {
				content: '';
				position: absolute;
				left: 1.8rem;
				top: 50%;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.3);
				transform: translateY(-50%);
				transition: all 0.25s ease;
			}

			&:hover {
				background-color: rgba(255, 255, 255, 0.08);
				color: rgb(255, 255, 255);
				padding-left: 3.5rem;

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

	/* 过渡动画 */
	.expand-enter-active,
	.expand-leave-active {
		transition: all 0.3s ease;
		max-height: 300px;
		overflow: hidden;
	}

	.expand-enter-from,
	.expand-leave-to {
		max-height: 0;
	}
}

/* 折叠菜单状态的特殊处理 */
.side-menu.sider-collapsed {
	.menu-parent-item {
		padding: 0.85rem 0;
		justify-content: center;

		.menu-icon {
			margin-right: 0;
		}
	}

	.menu-child-item {
		display: none;
	}
}
</style>
