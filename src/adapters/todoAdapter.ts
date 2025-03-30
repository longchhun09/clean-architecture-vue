import { ref, type Ref, computed } from 'vue'
import type { Todo, TodoFilter } from '../core/domain/entities'
import {
  GetTodosUseCase,
  AddTodoUseCase,
  ToggleTodoUseCase,
  DeleteTodoUseCase,
} from '../core/application/useCases'
import { LocalStorageTodoRepository } from '../core/infrastructure/todoRepository'

const todoRepository = new LocalStorageTodoRepository()
const getTodosUseCase = new GetTodosUseCase(todoRepository)
const addTodoUseCase = new AddTodoUseCase(todoRepository)
const toggleTodoUseCase = new ToggleTodoUseCase(todoRepository)
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository)

export function useTodos() {
  const todos: Ref<Todo[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const filter: Ref<TodoFilter> = ref({})

  const activeTodos = computed(() => todos.value.filter((todo) => !todo.completed))
  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))

  const fetchTodos = async () => {
    isLoading.value = true
    error.value = null

    try {
      todos.value = await getTodosUseCase.execute(filter.value)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const addTodo = async (title: string) => {
    if (!title.trim()) return

    isLoading.value = true
    error.value = null

    try {
      await addTodoUseCase.execute(title)
      await fetchTodos()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const toggleTodo = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      await toggleTodoUseCase.execute(id)
      await fetchTodos()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const deleteTodo = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      await deleteTodoUseCase.execute(id)
      await fetchTodos()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const setFilter = (newFilter: TodoFilter) => {
    filter.value = newFilter
    fetchTodos()
  }

  fetchTodos()

  return {
    todos,
    activeTodos,
    completedTodos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
  }
}
