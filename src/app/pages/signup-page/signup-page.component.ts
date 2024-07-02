import {Component, OnInit} from '@angular/core';
import {SignupFormComponent} from "../../components/signup-form/signup-form.component";
import {Router} from "@angular/router";
import {UserService} from '../../services/userServices/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    SignupFormComponent
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  signupUser(value: any) {
    const {name, lastName, email, password} = value;

    const userDTO = {
      email,
      name,
      lastName,
      password
    };
    this.userService.createUser(userDTO).subscribe({
      next: (response) => {
        console.log('User created:', response);

        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Cuenta creada con exito, un correo ha sido enviado a su casilla.'
        })

      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al crear la cuenta',
          footer: err
        })
      }
    });
  }
}
