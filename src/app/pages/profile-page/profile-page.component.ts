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
import {NavComponent} from "../../components/nav/nav.component";


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
      }
     
    })
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
      this.loginAction.emit(this.profileForm.value);
    }
  }
}
