import type { Todo, TodoFilter } from '../domain/entities'
import type { TodoRepository } from '../application/repositories'
import { v4 as uuidv4 } from 'uuid'

let todos: Todo[] = [
  {
    id: '1',
    title: 'Learn Clean Architecture',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Apply Clean Architecture to Vue.js',
    completed: false,
    createdAt: new Date(),
  },
]

export class LocalStorageTodoRepository implements TodoRepository {
  private readonly STORAGE_KEY = 'todos'

  constructor() {
    const storedTodos = localStorage.getItem(this.STORAGE_KEY)
    if (storedTodos) {
      todos = JSON.parse(storedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }))
    } else {
      this.saveToStorage()
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos))
  }

  async getAll(filter?: TodoFilter): Promise<Todo[]> {
    let filteredTodos = [...todos]

    if (filter?.completed !== undefined) {
      filteredTodos = filteredTodos.filter((todo) => todo.completed === filter.completed)
    }

    return Promise.resolve(filteredTodos)
  }

  async getById(id: string): Promise<Todo | null> {
    const todo = todos.find((t) => t.id === id)
    return Promise.resolve(todo || null)
  }

  async create(todoData: Omit<Todo, 'id'>): Promise<Todo> {
    const todo: Todo = {
      ...todoData,
      id: uuidv4(),
    }

    todos.push(todo)
    this.saveToStorage()

    return Promise.resolve(todo)
  }

  async update(id: string, todoData: Partial<Todo>): Promise<Todo> {
    const index = todos.findIndex((t) => t.id === id)

    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`)
    }

    const updatedTodo = { ...todos[index], ...todoData }
    todos[index] = updatedTodo
    this.saveToStorage()

    return Promise.resolve(updatedTodo)
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = todos.length
    todos = todos.filter((t) => t.id !== id)

    const deleted = initialLength > todos.length
    if (deleted) {
      this.saveToStorage()
    }

    return Promise.resolve(deleted)
  }
}
