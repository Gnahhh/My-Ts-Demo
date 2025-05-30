<script lang="ts" setup>
import UserList from './components/UserList.vue';
import UserSearchForm from './components/UserSearchForm.vue';
</script>

<template>
	<div class="user">
		<UserSearchForm></UserSearchForm>
		<UserList></UserList>
	</div>
</template>

<style lang="less" scoped>
.user {
	display: flex;
	flex-direction: column;
	padding: 2.5rem;
	gap: 4rem;
	background-color: #fff;
}
</style>
