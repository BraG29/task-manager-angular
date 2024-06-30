import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {tokenExistsGuard, tokenNoExists} from "./guards/token.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    canActivate: [tokenNoExists],
    component: LoginPageComponent
  },
  {
    path: 'signup',
    canActivate: [tokenNoExists],
    component: SignupPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [tokenExistsGuard],
    // Todas las rutas que sean hijas de home/ tendran navbar
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: '',
        component: TaskListPageComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'tasklist',
    component: TaskListPageComponent
  },
  {
    path: 'createTask',
    component: CreateTaskPageComponent
  }

];
