import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html'
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
