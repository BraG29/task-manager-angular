import { Component } from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { IJWTPayLoad } from '../../models/jwt-payload';
import { jwtDecode } from 'jwt-decode';
import { ITask } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss'
})
export class TaskListPageComponent {
  

  jwtPayload : IJWTPayLoad | undefined;

  tasks: ITask[] = [];

  projectNames: { [key: number]: string } = {}; //map de nombres de proyectos

  //cambiar por taskService
  constructor (private router: Router, private taskService: TaskService, private projetService: ProjectService) {}

  ngOnInit(): void{

    let token = sessionStorage.getItem('token');

    if(token){
      this.jwtPayload = jwtDecode(token);
    }

    this.loadTasks();
  }

  loadTasks() : void{
    this.taskService.getTasks(this.jwtPayload?.uid).subscribe({
      next: (response) => {

        this.tasks = response;
        this.tasks.forEach(task =>{ //buscar por cada tarea el nombre del proyecto
          this.getProjectName(task.project);
        });

      },error: (err) => {
        Swal.fire({
          icon: 'error',
          title:'Error',
          text: 'Ha ocurrido un error al cargar tareas.' + err
        })
      } 
    });
  }

  //funcion para obtener nombres
  getProjectName(id: number): void {
    if (!this.projectNames[id]) {
      this.projetService.getProjectData(id).subscribe({
        next: (response) => {
          this.projectNames[id] = response.title;//projectName viene de IProject ponele
        },
        error: (err) => {
          console.error(`Error al obtener datos del proyecto con ID ${id}:`, err);
        }
      });
    }   
  }

}
