import type { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-role.guard';
import { authGuard } from './core/guards/auth.guard';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          {
            path: 'manage-users',
            loadComponent: () =>
              import('./admin/components/manage-users/manage-users.component').then(
                (m) => m.ManageUsersComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/components/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
