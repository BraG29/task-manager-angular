import { Component } from '@angular/core';
import {ITask} from "../../models/task";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [
    MatList,
    MatListItem
  ],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.scss'
})
export class ProjectTasksComponent {
  tasks: ITask[] = [];

  setTasks(tasks: ITask[]){
    this.tasks = tasks;
  }

  getTasks(): ITask[] {
    return this.tasks;
  }
}
