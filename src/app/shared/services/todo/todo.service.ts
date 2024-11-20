import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItem } from '../../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor() {
    const existingTodos = [
      { id: 1, description: 'Do laundry', completed: false },
      { id: 2, description: 'Clean the kitchen', completed: true },
    ];
    this.todosSubject.next(existingTodos);
  }

  addTodo(description: string): void {
    const todos = this.todosSubject.value;
    const newTodo: TodoItem = {
      id: todos.length + 1,
      description,
      completed: false,
    };
    this.todosSubject.next([newTodo, ...todos]);
  }

  toggleTodoCompleted(id: number): void {
    const todos = this.todosSubject.value.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(this.sortTodos(todos));
  }

  private sortTodos(todos: TodoItem[]): TodoItem[] {
    return todos.sort((a, b) => Number(a.completed) - Number(b.completed));
  }
}
