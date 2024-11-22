import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from '../shared/services/todo/todo.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let todoSubject: BehaviorSubject<any[]>;

  const mockTodos = [
    { id: 1, description: 'Test Todo 1', completed: false },
    { id: 2, description: 'Test Todo 2', completed: true }
  ];

  beforeEach(async () => {
    todoSubject = new BehaviorSubject(mockTodos);

    todoService = jasmine.createSpyObj('TodoService', ['toggleTodoCompleted', 'addTodo'], {
      todos$: todoSubject.asObservable()
    });

    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of({ description: 'New Todo' }));

    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue(dialogRefSpyObj);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        TodoComponent
      ],
      providers: [
        { provide: TodoService, useValue: todoService },
        { provide: MatDialog, useValue: dialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todos from service', () => {
    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(2);
    
    const firstTodoText = listItems[0].query(By.css('span')).nativeElement.textContent;
    expect(firstTodoText.trim()).toBe('Test Todo 1');
  });

  it('should toggle todo completion status', () => {
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change', {});
    
    expect(todoService.toggleTodoCompleted).toHaveBeenCalledWith(1);
  });

  it('should open dialog when add button is clicked', () => {
    const addButton = fixture.debugElement.query(By.css('button'));
    addButton.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalledWith(
      AddTodoDialogComponent,
      jasmine.objectContaining({
        width: '500px',
        position: {
          top: '25%'
        }
      })
    );
  });

  it('should add new todo when dialog is closed with description', () => {
    component.addTodo();
    
    expect(todoService.addTodo).toHaveBeenCalledWith('New Todo');
  });

  it('should not add todo when dialog is closed without description', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(null));
    dialog.open.and.returnValue(dialogRefSpyObj);

    component.addTodo();
    
    expect(todoService.addTodo).not.toHaveBeenCalled();
  });
});