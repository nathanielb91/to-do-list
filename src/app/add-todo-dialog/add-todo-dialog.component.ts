import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AddTodoDialogComponent {
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTodoDialogComponent>
  ) {
    this.todoForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAdd() {
    if (this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }

}
