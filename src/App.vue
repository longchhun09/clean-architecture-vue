<script setup lang="ts">
import TodoList from './presentation/TodoList.vue';
</script>

<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
}
</style>
