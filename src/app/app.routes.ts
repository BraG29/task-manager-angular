import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {tokenGuard} from "./guards/token.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [tokenGuard],
    // Todas las rutas que sean hijas de home/ tendran navbar
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: '',
        component: TaskPageComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },

];
