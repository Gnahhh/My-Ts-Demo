<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
	{ name: '标题一', children: [{ name: '子标题一' }, { name: '子标题二' }] },
	{ name: '标题一', children: [{ name: '子标题一' }] },
	{ name: '标题一', children: [{ name: '子标题一' }] }
]);

const expandedItems = ref(new Set<number>());

const toggleItem = (index: number) => {
	if (expandedItems.value.has(index)) {
		// 如果已经展开，则折叠
		expandedItems.value.delete(index);
	} else {
		// 如果未展开，则展开
		expandedItems.value.add(index);
	}
};

// 检查项目是否展开
const isExpanded = (index: number): boolean => {
	return expandedItems.value.has(index);
};
</script>

<template>
	<div class="pull-down">
		<div v-for="(item, index) in options" :key="index">
			<div class="parent-item" @click="toggleItem(index)" :class="{ expanded: isExpanded(index) }">
				<span>{{ item.name }}</span>
			</div>
			<Transition name="expand">
				<div class="children-container" v-show="isExpanded(index)">
					<div v-for="(iten, inde) in item.children" :key="inde">{{ iten.name }}</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style lang="less" scoped>
.pull-down {
	width: 100%;
	text-align: center;
	.parent-item {
		background-color: #f0f0f0;

		&.expanded {
			background-color: orange;
		}
	}

	// 过渡动画样式
	.expand-enter-active,
	.expand-leave-active {
		transition: all 0.2s ease;
		max-height: 200px;
		overflow: hidden;
	}

	.expand-enter-from,
	.expand-leave-to {
		max-height: 0;
	}
}
</style>
