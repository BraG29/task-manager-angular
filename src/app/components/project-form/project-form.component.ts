import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IProject} from "../../models/project";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCard, MatCardContent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  get name(){
    return this.form.get('name');
  }

  get description(){
    return this.form.get('description')
  }

  setFormValues(name: string, description: string | null){
    this.form.patchValue({
      name: name,
      description: description
    });
  }
}
