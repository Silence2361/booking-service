import { Routes } from '@angular/router';
import { AuthComponent } from './auth-page/auth-page.component';
import { MainComponent } from './main-page/main-page.component';
import { AdminComponent } from './admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: MainComponent },
  { path: 'admin', component: AdminComponent },
];
