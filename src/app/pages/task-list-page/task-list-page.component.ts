import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../services/userServices/user.service';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { IJWTPayLoad } from '../../models/jwt-payload';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss'
})
export class TaskListPageComponent {
  

  jwtPayload : IJWTPayLoad | undefined;

  //cambiar por taskService
  constructor (private router: Router, private userService: UserService) {}

  ngOnInit(): void{

    let token = sessionStorage.getItem('token');

    if(token){
      this.jwtPayload = jwtDecode(token);
    }

    this.loadTasks();
  }

  loadTasks() : void{
    this.userService.getTasks(this.jwtPayload?.uid).subscribe({
      next: (response) => {
        console.log('tasks:', response);
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
        //error
        Swal.fire({
          icon: 'error',
          title:'Error',
          text: 'Ha ocurrido un error al cargar cuentas.'
        })
      } 
    })
  }


}
