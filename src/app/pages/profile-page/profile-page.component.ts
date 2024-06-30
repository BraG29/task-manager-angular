import {Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { IJWTDecode } from '../../models/jwtdecode';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, NavComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  
  
  @Output()
  loginAction: EventEmitter<{}> = new EventEmitter<{}>();
  
  user : IUser | undefined;

  jwtPayload : IJWTDecode | undefined;


  constructor(private formBuilder: FormBuilder, private userService: AuthService) {}

  ngOnInit(): void {
    
    let token = sessionStorage.getItem('token');

    if(token){
      this.jwtPayload = jwtDecode(token);
    }

    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      password: ['', Validators.required]
    });

    
    this.userService.getUser(this.jwtPayload?.uid).subscribe({ 
      next: (response: IUser) : void => {
        this.user = response;
        this.profileForm.patchValue({
          name: this.user.name,
          lastName: this.user.lastName,
          password: this.user.password,
          email: this.user.email
        });
      },
      error: (err) => { 
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Backend error',
          footer: err.message
        });
      }
    });
  }
  
  get name(){
    return this.profileForm.get('name');
  }

  get lastName(){
    return this.profileForm.get('lastName');
  }
  
  
  get password(){
    return this.profileForm.get('password');
  }

  get email(){
    return this.profileForm.get('email');
  }


  submitProfile(){
    if(this.profileForm.valid){

      //alerta de confirmacion.
      Swal.fire({
        title : '¿Estas seguro?',
        text: 'Se actualizarán los datos de tu perfil',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
      }).then((result) => {
        if(result.isConfirmed){
          const { name, lastName, password } = this.profileForm.value; //data del form
      
          const userDTO = {
            id: this.jwtPayload?.uid, //id del usuario en sesion
            name,
            lastName,
            password
          };
          this.userService.updateUser(userDTO).subscribe({
            next: (response) => {
              //TODO alerta
              console.log('User actualizado:', response);
              //exito
              Swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: 'Perfil actualizado con exito'
              })

            },
            error: (err) => {
              //TODO alerta
              console.error('Error al actualizar usuario:', err);
              
              //error
              Swal.fire({
                icon: 'error',
                title:'Error',
                text: 'Ha ocurrido un error al actualizar tu perfil'
              })

            }
          });
        }
      });

      this.loginAction.emit(this.profileForm.value);
    }
  }
}
