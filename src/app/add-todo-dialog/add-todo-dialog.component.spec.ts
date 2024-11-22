import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTodoDialogComponent } from './add-todo-dialog.component';

describe('AddTodoDialogComponent', () => {
  let component: AddTodoDialogComponent;
  let fixture: ComponentFixture<AddTodoDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddTodoDialogComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ AddTodoDialogComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with form value when form is valid', () => {
    const description = 'New Todo Item';
    component.todoForm.patchValue({ description });
    
    component.onAdd();
    
    expect(dialogRef.close).toHaveBeenCalledWith({ description });
  });

  it('should mark description as required when empty', () => {
    const descriptionControl = component.todoForm.get('description');
    
    expect(descriptionControl?.hasError('required')).toBeTrue();
    
    descriptionControl?.setValue('test');
    expect(descriptionControl?.hasError('required')).toBeFalse();
  });

});