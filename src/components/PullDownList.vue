<script lang="ts" setup>
import { PropType, ref } from 'vue';
import type { MenuResult } from '@/types/login';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';

const props = defineProps({
	options: {
		type: Array as PropType<MenuResult[]>,
		required: true
	}
});

// 记录扩展
const expandedItems = ref(new Set<number>());

// 扩展事件
const toggleItem = (index: number) => {
	if (expandedItems.value.has(index)) {
		expandedItems.value.delete(index);
	} else {
		expandedItems.value.add(index);
	}
};

const isExpanded = (index: number): boolean => {
	return expandedItems.value.has(index);
};

const sliceIconName = (name: string) => {
	return name.replace(/^el-icon-/, '');
};
</script>

<template>
	<div class="pull-down-menu">
		<div v-for="(item, index) in options" :key="index" class="menu-item-wrapper">
			<div
				class="menu-parent-item"
				:class="{ 'menu-expanded': isExpanded(index) }"
				@click="toggleItem(index)"
			>
				<div class="menu-title">
					<el-icon class="menu-icon">
						<component :is="sliceIconName(item.icon || '')" />
					</el-icon>
					<span class="menu-label">{{ item.name }}</span>
				</div>
				<el-icon class="menu-arrow">
					<ArrowUpBold v-if="isExpanded(index)" />
					<ArrowDownBold v-else />
				</el-icon>
			</div>

			<Transition name="expand">
				<div class="menu-children" v-show="isExpanded(index)">
					<div v-for="(iten, inde) in item.children" :key="inde" class="menu-child-item">
						{{ iten.name }}
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style lang="less" scoped>
.pull-down-menu {
	width: 100%;

	.menu-item-wrapper {
		// 每个菜单项和其子菜单的容器
	}

	.menu-parent-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		transition: all 0.25s ease;

		.menu-title {
			display: flex;
			align-items: center;

			.menu-icon {
				// 基础图标容器样式
			}

			.menu-label {
				// 基础文本样式
			}
		}

		.menu-arrow {
			// 箭头图标基础样式
		}

		&.menu-expanded {
			// 展开状态的基础样式
		}
	}

	.menu-children {
		overflow: hidden;

		.menu-child-item {
			cursor: pointer;
		}
	}

	// 保留过渡动画基础框架
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
</style>
