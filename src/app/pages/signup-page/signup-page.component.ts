import {Component, OnInit} from '@angular/core';
import {SignupFormComponent} from "../../components/signup-form/signup-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    SignupFormComponent
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit{

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');

    if(token){
      console.log('token: ' + token);
      this.router.navigate(['/home']);
    }
  }

  signupUser(value: any) {
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
      complete: () => console.info('Petición de registro finalizada')
    });
  }
}
