import type { Todo, TodoFilter } from '../domain/entities'
import { TodoService } from '../domain/services'
import type { TodoRepository } from './repositories'

export class GetTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(filter?: TodoFilter): Promise<Todo[]> {
    const todos = await this.todoRepository.getAll()
    return filter ? TodoService.filterTodos(todos, filter) : todos
  }
}

export class AddTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(title: string): Promise<Todo> {
    return this.todoRepository.create({
      title,
      completed: false,
      createdAt: new Date(),
    })
  }
}

export class ToggleTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.todoRepository.getById(id)
    if (!todo) throw new Error(`Todo with id ${id} not found`)

    return this.todoRepository.update(id, {
      completed: !todo.completed,
    })
  }
}

export class DeleteTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.todoRepository.delete(id)
  }
}
