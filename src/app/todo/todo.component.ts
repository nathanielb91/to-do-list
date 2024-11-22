import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TodoService } from '../shared/services/todo/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule
  ]
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
        top: '20%',
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
