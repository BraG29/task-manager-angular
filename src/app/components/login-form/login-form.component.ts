import {Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});

  @Output()
  loginAction: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submitLogin(){
    if(this.loginForm.valid){
      this.loginAction.emit(this.loginForm.value);
    }
  }

}
