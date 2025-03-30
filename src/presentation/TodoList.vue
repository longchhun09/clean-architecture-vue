<script setup lang="ts">
import { ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { useTodos } from '../adapters/todoAdapter';

const newTodoTitle = ref('');
const filterOption = ref('all');

const {
  todos,
  isLoading,
  error,
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter
} = useTodos();

const handleAddTodo = () => {
  if (newTodoTitle.value.trim()) {
    addTodo(newTodoTitle.value);
    newTodoTitle.value = '';
  }
};

const handleFilterChange = (value: string) => {
  filterOption.value = value;

  switch (value) {
    case 'active':
      setFilter({ completed: false });
      break;
    case 'completed':
      setFilter({ completed: true });
      break;
    default:
      setFilter({});
      break;
  }
};
</script>

<template>
  <div class="todo-container">
    <h1>Todo App with Clean Architecture</h1>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="add-todo">
      <input
        v-model="newTodoTitle"
        placeholder="Add a new todo..."
        @keyup.enter="handleAddTodo"
      />
      <button @click="handleAddTodo">Add</button>
    </div>

    <div class="filter-controls">
      <button
        :class="{ active: filterOption === 'all' }"
        @click="handleFilterChange('all')"
      >All</button>
      <button
        :class="{ active: filterOption === 'active' }"
        @click="handleFilterChange('active')"
      >Active</button>
      <button
        :class="{ active: filterOption === 'completed' }"
        @click="handleFilterChange('completed')"
      >Completed</button>
    </div>

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-else-if="todos.length === 0" class="empty-state">
      No todos found.
    </div>

    <div v-else class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
}

.add-todo input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.add-todo button {
  padding: 10px 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.add-todo button:hover {
  background-color: #40a9ff;
}

.filter-controls {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-controls button {
  margin: 0 5px;
  padding: 8px 15px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.filter-controls button.active {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.error-message {
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  padding: 10px;
  margin-bottom: 20px;
  color: #f5222d;
  border-radius: 4px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #999;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.todo-list {
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
