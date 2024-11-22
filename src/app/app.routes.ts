import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'explorer',
    loadComponent: () => import('./explorer/explorer.component').then(m => m.ExplorerComponent),
    canActivate: [authGuard]
  },
  {
    path: 'todo',
    loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];