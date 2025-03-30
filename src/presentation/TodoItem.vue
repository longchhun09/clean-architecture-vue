<script setup lang="ts">
import type { Todo } from '../core/domain/entities'

interface Props {
  todo: Todo
}

const props = defineProps<Props>()
const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
}>()

const handleToggle = () => {
  emit('toggle', props.todo.id)
}

const handleDelete = () => {
  emit('delete', props.todo.id)
}
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input type="checkbox" :checked="todo.completed" @change="handleToggle" />
    <span class="todo-title">{{ todo.title }}</span>
    <button @click="handleDelete" class="delete-btn">Delete</button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-title {
  margin-left: 10px;
  flex-grow: 1;
}

.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #ff7875;
}
</style>
