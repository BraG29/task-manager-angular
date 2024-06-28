import {Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  
  
  @Output()
  loginAction: EventEmitter<{}> = new EventEmitter<{}>();
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  
  get name(){
    return this.profileForm.get('name');
  }

  
  get email(){
    return this.profileForm.get('email');
  }

  
  get password(){
    return this.profileForm.get('password');
  }

  submitProfile(){
    if(this.profileForm.valid){
      this.loginAction.emit(this.profileForm.value);
    }
  }
}
