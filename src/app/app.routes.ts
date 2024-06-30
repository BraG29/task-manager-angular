import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';

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
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'task',
    component: TaskPageComponent
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
