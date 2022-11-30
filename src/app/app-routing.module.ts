import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { AngularFireAuthGuard,redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  { path:'auth',
    canActivate: [AngularFireAuthGuard],
    data : { authGuardPipe : redirectLoggedInToDashboard },
    loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    ]
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
