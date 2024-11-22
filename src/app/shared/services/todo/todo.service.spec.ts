import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { first } from 'rxjs/operators';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default todos', (done) => {
    service.todos$.pipe(first()).subscribe(todos => {
      expect(todos.length).toBe(7);
      expect(todos[0].description).toBe('Do laundry');
      expect(todos[0].completed).toBeFalse();
      expect(todos[6].description).toBe('Complete coding assessment');
      expect(todos[6].completed).toBeTrue();
      done();
    });
  });

  it('should add new todo at the beginning of the list', (done) => {
    const newDescription = 'Fold the laundry';
    
    service.todos$.pipe(first()).subscribe(initialTodos => {
      const initialCount = initialTodos.length;
      
      service.addTodo(newDescription);
      
      service.todos$.pipe(first()).subscribe(updatedTodos => {
        expect(updatedTodos.length).toBe(initialCount + 1);
        expect(updatedTodos[0].description).toBe(newDescription);
        done();
      });
    });
  });
});