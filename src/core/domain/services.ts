import type { Todo, TodoFilter } from './entities'

export class TodoService {
  static filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
    return todos.filter((todo) => {
      if (filter.completed !== undefined) {
        return todo.completed === filter.completed
      }
      return true
    })
  }
}
