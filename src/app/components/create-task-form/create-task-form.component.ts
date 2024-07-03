import { Component,OnInit, EventEmitter, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import { ProjectService } from '../../services/project.service';
import {jwtDecode} from "jwt-decode";
import {IJWTPayLoad} from "../../models/jwt-payload";
import { IProject } from '../../models/project';
import {MatSelectModule} from '@angular/material/select'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, MatSelectModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss'
})
export class CreateTaskFormComponent implements OnInit{

	//this is the form that we will be filling with data and validators down the line
	taskForm: FormGroup = new FormGroup({});


	jwtPayload: IJWTPayLoad | null= null;

	projects: IProject[] = [];

	//this is the equivalent of the publisher in Jakarta
	@Output()
	submitTask: EventEmitter<{}> = new EventEmitter<{}>();

	//we do the forbidden sorcery known as "dependency injection"
	constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private router: Router, private activatedRouter: ActivatedRoute)  {}

	//idk anymore lmao
	private userID = 0;

	projectId: string | null = null;

	//on this init we load all the validators for the form
	ngOnInit(): void {

		const token = sessionStorage.getItem('token');

		if(token){// if the token exists, decode it with the jwtThingy
			this.jwtPayload = jwtDecode(token);

		}else{//if the token is null, send me back to login
			this.router.navigate(['/login']);
		}

		if(this.jwtPayload){//here we ask for encrypted data on the jwtPayload
			this.userID = this.jwtPayload.uid;

		}

		this.projectId =  this.activatedRouter.snapshot.paramMap.get('projectId'); //cargo la id que viene en la url
		console.log(this.projectId);
		console.log("AAAAAAAAAAAAAAAA")


		this.taskForm = this.formBuilder.group({
			title: ['', [Validators.required, ]],
			description: ['', Validators.required],
			limitDate: ['', Validators.required],
			project: [!this.projectId ? '' : this.projectId, Validators.required]

		    });

		this.loadProjects();

	

	}
//     }

	loadProjects() : void {

		this.projectService.projectsByUser(this.userID).subscribe({

			next: (response) =>{

				this.projects = response;

				console.log(this.projects);
			},
			error: (e) =>{
				console.log(e);
			}
		})
	}

	//the function I will call when I press the button on the form to send the data to the page, which then will  call the PHP backend
	publishTaskEvent(){


		this.submitTask.emit(this.taskForm.value);

	}


	get title(){
		return this.taskForm.get('title');
	};

	get description(){
		return this.taskForm.get('description');
	}

	get limitDate(){
		return this.taskForm.get('limitDate');
	}

	get project(){
		return this.taskForm.get('project');
	}

	// "title": "Tarea De Luther para ver si se repite en proyecto 1",
	// "description": "TareaDeRandall",
	// "limitDate": "03-04-2025",
	// "taskState": 1,
	// "project": 1,
	// "userID": 2

}
