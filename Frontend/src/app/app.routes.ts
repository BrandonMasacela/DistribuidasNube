import { Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized/authorized.component';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component')
  },
  {
    path: 'mostrarUsuarios',
    loadComponent: () => import('./usuario-list/usuario-list.component')
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./usuario-form/usuario-form.component')
  },
  {
    path: 'mostrarUsuarios/:id/editar',
    loadComponent: () => import('./usuario-form/usuario-form.component')
  },
  {
    path: ':id/mostrarUsuario',
    loadComponent: () => import('./usuario-list/usuario-list.component')
  },
  {
    path: 'mostrarCursos',
    loadComponent: () => import('./curso-list/curso-list.component')
  },
  {
    path: 'nuevoCurso',
    loadComponent: () => import('./curso-form/curso-form.component')
  },
  {
    path: 'mostrarCursos/:id/editar',
    loadComponent: () => import('./curso-form/curso-form.component')
  },
  {
    path: ':id/mostrarCursos',
    loadComponent: () => import('./curso-list/curso-list.component')
  },
  {
    path: 'mostrarInscripciones',
    loadComponent: () => import('./curso-usuario/curso-usuario.component')
  },
  {
    path: 'homeAdmin',
    loadComponent: () => import('./admin/admin.component')
  },
  {
    path: 'homeUser',
    loadComponent: () => import('./user/user.component')
  },
  {
    path: 'authorized',
    component: AuthorizedComponent
  },
  {
    path: '**',
    redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component')
  },
];
