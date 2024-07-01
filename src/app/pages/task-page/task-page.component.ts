import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userServices/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { ITask } from '../../models/task';
import { IJWTPayLoad } from '../../models/jwt-payload';
import { jwtDecode } from 'jwt-decode';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  taskForm: FormGroup = new FormGroup({});

  taskId: string | null = null;

  task : ITask | undefined;
  
  jwtPayload : IJWTPayLoad | undefined;

  showButtonsResult: boolean = false;

  constructor(private router: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) {

    this.taskForm = this.formBuilder.group({
      name: [''],
      description: [''],
      date: ['']
    });
   }

  ngOnInit(): void {

    let token = sessionStorage.getItem('token');

    if(token){
      this.jwtPayload = jwtDecode(token);
    }


    this.taskId =  this.router.snapshot.paramMap.get('taskId'); //cargo la id que viene en la url
    this.loadTask();
   }


  loadTask() : void{
    let id = Number(this.taskId);

    this.userService.getTask(id).subscribe({
      next: (response) => {
        console.table(response);  
        this.task = response;
        let array = response.links;
        
        if(this.showButtons(array)){
          this.showButtonsResult = true;
        }

        let dateStr = this.task.limitDate.date.split(' '); //split de la fecha me quedo con el primero lugar del array.        
        this.taskForm.patchValue({
        name: this.task.title,
        description: this.task.description,
        date: dateStr[0]
        });
      }, 
        error: (err) => {
        console.error('Error al cargar tarea:', err);
        Swal.fire({
          icon: 'error',
          title:'Error',
          text: 'Ha ocurrido un error al cargar tarea.'
        })
      }
    });
  } 
  
get name(){
  return this.taskForm.get('name');
}

get description(){
  return this.taskForm.get('description');
}

get date(){
  return this.taskForm.get('date');
}

  //que rol puede editar.
  showButtons(array: number[]) : boolean{
    
    //recorrer array de vinculos. y buscar usuario que concuerde con el id. y verificar si el rol es admin.
    array.forEach(element => {
     
    });

    let userId = this.jwtPayload?.uid;
    //buscar vinculo, si tiene permisos devuelvo true, esperar a martin.
    return false;
  }

  //editTask
  GuardarCambios(): void {
   //llamar al service para actualizar tarea
  }

  //deleteTask
  EliminarTarea(): void {
    //llamar al service para eliminar tarea
  }

  //endTask
  FinalizarTarea(): void {
    //llamar al service para finalizar/actualizar estado de tarea
  }

}
