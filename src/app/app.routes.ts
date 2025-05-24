import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/components/register/register.component').then(
        m => m.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'scan',
    loadComponent: () =>
      import('./features/qr-scanner/qr-scanner.component').then(
        m => m.QrScannerComponent
      ),
  },
  {
    path: 'quiz/:id',
    loadComponent: () =>
      import('./features/quiz/quiz.component').then(m => m.QuizComponent),
    canActivate: [authGuard],
  },
  {
    path: 'result/:id',
    loadComponent: () =>
      import('./features/quiz/result/result.component').then(
        m => m.ResultComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
  },
];
