import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NavComponent} from "../../components/nav/nav.component";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginFormComponent,NavComponent
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
      error: (e) => console.table(e),
      complete: () => console.info('Petición de Login finalizada')
    });
  }
}
