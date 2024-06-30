import {Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent implements OnInit{
  signupForm: FormGroup = new FormGroup({});

  @Output()
  signupAction: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(private formBuilder: FormBuilder, private userService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get name(){
    return this.signupForm.get('name');
  }
  
  get lastName(){
    return this.signupForm.get('lastName');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  submitSignup(){
    if(this.signupForm.valid){

      const { name, lastName, email,  password } = this.signupForm.value;
      const userDTO = {
        email, 
        name,
        lastName,
        password
      };

      this.userService.createUser(userDTO).subscribe({
        next: (response) => {
          console.log('User created:', response);
          //exito
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Cuenta creada con exito, un correo ha sido enviado a su casilla.'
          })

        },
        error: (err) => {
          console.error('Error al crear cuenta:', err);
          //error
          Swal.fire({
            icon: 'error',
            title:'Error',
            text: 'Ha ocurrido un error al crear la cuenta'
          })

        }
      });

      this.signupAction.emit(this.signupForm.value);
    }
  }
}
