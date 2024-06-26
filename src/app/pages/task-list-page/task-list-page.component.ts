import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../services/userServices/user.service';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { IJWTPayLoad } from '../../models/jwt-payload';
import { jwtDecode } from 'jwt-decode';
import { ITask } from '../../models/task';


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
  constructor (private router: Router, private userService: UserService) {}

  ngOnInit(): void{

    let token = sessionStorage.getItem('token');

    if(token){
      this.jwtPayload = jwtDecode(token);
    }

    this.loadTasks();
  }

  //TODO buscar nombres de proyectos.
  loadTasks() : void{
    this.userService.getTasks(this.jwtPayload?.uid).subscribe({
      next: (response) => {

        console.table(response);
        this.tasks = response;
        
        /*
        this.tasks.forEach(task =>{ //buscar por cada tarea el nombre del proyecto
          this.getProjectName(task.project);
        });*/

      },error: (err) => {
        console.error('Error al cargar tareas:', err);
        Swal.fire({
          icon: 'error',
          title:'Error',
          text: 'Ha ocurrido un error al cargar tareas.'
        })
      } 
    });
  }

  //funcion para obtener nombres
  getProjectName(id: number): void {
    if (!this.projectNames[id]) {
      this.userService.getProjectData(id).subscribe({
        next: (response) => {
          console.table(response);
          //this.projectNames[id] = response.title;//projectName viene de IProject ponele
        },
        error: (err) => {
          console.error(`Error al obtener datos del proyecto con ID ${id}:`, err);
        }
      });
    }
  }

}
