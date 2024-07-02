import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { ILink } from '../../models/link';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  
  taskForm: FormGroup = new FormGroup({});

  @Output()
  formAction: EventEmitter<{}> = new EventEmitter<{}>();

  taskId: string | null = null;

  task : ITask | undefined;

  links : ILink[] = [];
  
  jwtPayload : IJWTPayLoad | undefined;

  showButtonsResult: boolean = false;

  constructor(private router: ActivatedRoute, private taskService: TaskService, private formBuilder: FormBuilder) {

    this.taskForm = this.formBuilder.group({
      name: [''],
      description: [''],
      date: [''],
      state: ['']
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

    this.taskService.getTask(id).subscribe({
      next: (response) => {

        this.task = response;

        this.links = response.links;

        this.showButtons(this.links)
        
        let dateStr = this.task.limitDate.date.split(' '); //split de la fecha me quedo con el primero lugar del array.        
        this.taskForm.patchValue({

        name: this.task.title,
        description: this.task.description,
        date: dateStr[0],
        state: 'algo'

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

  get state(){
    return this.taskForm.get('state');
  }

  //mostrar botones, TODO ocultar botones cuando la tarea esta finalizada.
  showButtons(array: ILink[] | undefined) : boolean{
    
    if (!array) {
      return false;
    }
    let userId = this.jwtPayload?.uid;

    //recorrer array de vinculos. y buscar usuario que concuerde con el id. y verificar si el rol es admin.
    array.forEach(element => {

      //probar cuando termine martin:
     if(element.user && element.user.id === userId && element.role === 1){
        this.showButtonsResult = true;
     }
    });

    return this.showButtonsResult;
  }

  //funca
  GuardarCambios(): void {
    if(this.taskForm.valid){

      //alerta de confirmacion.
      Swal.fire({
        title : '¿Estas seguro?',
        text: '¿Deseas actualizar esta tarea?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
      }).then((result) => {
        if(result.isConfirmed){
          const { name, description, date } = this.taskForm.value; //data del form

          const taskDTO = {
            id: this.taskId, //id del usuario en sesion
            userID: this.jwtPayload?.uid,
            title: name,
            description: description,
            limitDate: date
          };
          this.taskService.updateTask(taskDTO).subscribe({
            next: (response) => {
              console.log('Tarea actualizada:', response);
              //exito
              Swal.fire({
                icon: 'success',
                title: 'Actualizada',
                text: 'Tarea actualizada con exito'
              })

            },
            error: (err) => {
              //TODO alerta
              console.error('Error al actualizar tarea:', err);
              //error
              Swal.fire({
                icon: 'error',
                title:'Error',
                text: 'Ha ocurrido un error al actualizar la tarea'
              })

            }
          });
        }
      });

      this.formAction.emit(this.taskForm.value);
    }
  }

  //deleteTask
  EliminarTarea(): void {
    console.log('eliminar tarea');
  }

  //endTask
  FinalizarTarea(): void {
    if(this.taskForm.valid){

      //alerta de confirmacion.
      Swal.fire({
        title : '¿Estas seguro?',
        text: '¿Deseas finalizar la tarea?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar'
      }).then((result) => {
        if(result.isConfirmed){
          const { status } = this.taskForm.value; //data del form

          const taskDTO = {
            id: this.taskId, //id del usuario en sesion
            userID: this.jwtPayload?.uid,
            status: 'algo'
          };
          this.taskService.updateTask(taskDTO).subscribe({
            next: (response) => {
              console.log('Tarea actualizada:', response);
              //exito
              Swal.fire({
                icon: 'success',
                title: 'Finalizada',
                text: 'Tarea finalizada con exito.'
              })

            },
            error: (err) => {
              //TODO alerta
              console.error('Error al finalizar tarea:', err);
              //error
              Swal.fire({
                icon: 'error',
                title:'Error',
                text: 'Ha ocurrido un error al finalizar la tarea'
              })

            }
          });
        }
      });

      this.formAction.emit(this.taskForm.value);
    }
  }

}
