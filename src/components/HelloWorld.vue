<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>
      这是一个手动搭建的Vue 3 + Vite + TypeScript项目
      <br>
      没有使用任何脚手架工具
    </p>
  </div>
</template>

<style scoped>
.hello {
  margin-bottom: 20px;
}

h2 {
  color: #42b883;
}
</style>