import {Component, Input} from '@angular/core';
import {ITask} from "../../models/task";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {NavigationExtras, Router} from "@angular/router";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatButton
  ],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.scss'
})
export class ProjectTasksComponent {
  @Input() projectId: number | null = 0;
  tasks: ITask[] = [];

  constructor(private router: Router) {
  }

  setTasks(tasks: ITask[]){
    this.tasks = tasks;
  }

  getTasks(): ITask[] {
    return this.tasks;
  }

  addTask(){
    console.log('Id del proyecto: ' + this.projectId);
    let navigationExtras: NavigationExtras = {
      state: {
        projectId: this.projectId
      }
    };

    this.router.navigate(['/home/createTask'], navigationExtras);

  }
}
