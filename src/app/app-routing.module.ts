import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'todo', component: TodoComponent, canMatch: [authGuard] },
  // { path: 'explorer', component: TreeComponent, canActivate: [authGuard] },
  // { path: 'admin', component: TreeComponent, canActivate: [adminGuard] }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
