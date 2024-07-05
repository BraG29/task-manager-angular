import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');

    if(token){
      console.log('token: ' + token);
      this.router.navigate(['/home']);
    }
  }

  logUser(value: any) {
    let {email, password} = value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.table(response);
        if(response.token){
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        }
      },
      //TODO error alert
      error: (e) => {

        console.table(e);
        Swal.fire({
          title: "ERROR!",
          text: "Las creedenciales están incorrectas",
          icon: "error"
        })


      },
      complete: () => console.info('Petición de Login finalizada')
    });
  }

}
