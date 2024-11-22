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
      { id: 2, description: 'Call Mom', completed: false },
      { id: 3, description: 'Rake leaves', completed: false },
      { id: 4, description: 'Pick up dry cleaning', completed: false },
      { id: 5, description: 'Mow the lawn', completed: true },
      { id: 6, description: 'Clean the kitchen', completed: true },
      { id: 7, description: 'Complete coding assessment', completed: true },
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
    const todos = this.todosSubject.value;
    const updatedTodos: TodoItem[] = [];
    
    todos.forEach(todo => {
      if (todo.id === id) {
        updatedTodos.push({
          id: todo.id,
          description: todo.description,
          completed: !todo.completed
        });
      } else {
        updatedTodos.push(todo);
      }
    });
    
    this.todosSubject.next(this.sortTodos(updatedTodos));
  }

  private sortTodos(todos: TodoItem[]): TodoItem[] {
    const incompleteTodos: TodoItem[] = [];
    const completedTodos: TodoItem[] = [];
    
    todos.forEach(todo => {
      if (todo.completed) {
        completedTodos.push(todo);
      } else {
        incompleteTodos.push(todo);
      }
    });
    
    const sortedTodos = [...incompleteTodos, ...completedTodos];
    
    return sortedTodos;
  }
}
