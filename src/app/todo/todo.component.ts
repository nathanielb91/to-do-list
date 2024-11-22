import { Component } from '@angular/core';
import { TodoService } from '../shared/services/todo/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  todos$ = this.todoService.todos$;

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog) {}

  toggleCompleted(id: number) {
    this.todoService.toggleTodoCompleted(id);
  }

  addTodo() {

    const dialogConfig = {
      width: '500px',
      position: {
        top: '30%',
      },
    };
    const dialogRef = this.dialog.open(AddTodoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((description) => {
      if (description) {
        this.todoService.addTodo(description.description);
      }
    });
  }

}
