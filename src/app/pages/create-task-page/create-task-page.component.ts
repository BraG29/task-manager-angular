import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/task';
import { CreateTaskFormComponent } from '../../components/create-task-form/create-task-form.component';
import {IJWTPayLoad} from "../../models/jwt-payload";
import {jwtDecode} from "jwt-decode";
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [CreateTaskFormComponent],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss'
})

export class CreateTaskPageComponent implements OnInit {

	//I don't fully understand how this works, los pibes just told me to use this as indicated
	//on the navbar and login pages, we will get 
	//the token we generate with JWT to corroborate the user is logged in
	jwtPayload: IJWTPayLoad | null= null;


	user = "";
	userID = 0;



	//just like PHP, this is how I inject something into my class, or my component in Angular's case
	//the OG object I want to inject has to have a specific attribute thingy on it
	constructor(private router: Router, private taskService:TaskService, private activatedRouter: ActivatedRoute){}

	projectId: string | null = null;

	//this function gets called when the page gets rendered
	ngOnInit(): void {

		const token = sessionStorage.getItem('token');

		if(token){// if the token exists, decode it with the jwtThingy
			this.jwtPayload = jwtDecode(token);

		}else{//if the token is null, send me back to login
			this.router.navigate(['/login']);
		}

		if(this.jwtPayload){//here we ask for encrypted data on the jwtPayload
			this.user = `${this.jwtPayload?.name} ${this.jwtPayload?.lastName}`;
			this.userID = this.jwtPayload.uid;
		}

		this.projectId =  this.activatedRouter.snapshot.paramMap.get('projectId'); //cargo la id que viene en la url
		console.log(this.projectId);
	}

	getDateNow(): string {

		// we get the current date
		let currentDate = new Date();

		// Extract the year, month, and day
		let year = currentDate.getFullYear();

		// Months are zero-based, so we add 1
		let month = String(currentDate.getMonth() + 1).padStart(2, '0'); 

		//funnily enough, days are not zero-based
		let day = String(currentDate.getDate()).padStart(2, '0');

		let formattedDate = `${year}-${month}-${day}`;

		console.log(formattedDate); // Outputs: YYYY-MM-DD
		return formattedDate;
	}

	createTask(value: any){

		if(!this.projectId || this.projectId === undefined){

				//we extract all the data we got from the form we sent with Angular
			let  {title, description, limitDate, project} = value;

			console.log(value);
	
			//we build the Json/body/ITask/array/whatever  to send to our taskService and call our PHP's API
			const body = {
				id: 0,
				title,
				description,
				limitDate,
				taskState: 0,
				project,
				userID: this.userID
			}

			//we call the taskService to call our API from PHP 
			this.taskService.createTask(body).subscribe({

				//next gives me response if the request went correctly, and saves the data we received
				next: (response) =>{

					//we log the response in a fancy way
					console.table(response);

					//we make a Sweet Alert for the user to read
					Swal.fire({
						title: "Tarea creada con éxito!",
						text: "La tarea "+ body.title + " se dió de alta correctamente",
						icon: "success"
					})
				},

				//"error" gets called when something breaks up during the call of the OG function
				error: (e) => {

					//again, we print the error in a fancy way
					console.table(e);

					Swal.fire({
						title: "ERROR!",
						text: JSON.stringify(e.error.error),
						icon: "error"
					})

				},

				//finally{}, literally a try and catch type of finally{}
				complete:() =>{ console.info("Se dió de alta la tarea" + body.title + "correctamente")}
			});

		}else{

			//we extract all the data we got from the form we sent with Angular
			let  {title, description, limitDate, project} = value;

			console.log(value);
	
			//we build the Json/body/ITask/array/whatever  to send to our taskService and call our PHP's API
			const body = {
				id: 0,
				title,
				description,
				limitDate,
				taskState: 0,
				project,
				userID: this.userID
			}

			//we call the taskService to call our API from PHP 
			this.taskService.createTask(body).subscribe({

				//next gives me response if the request went correctly, and saves the data we received
				next: (response) =>{

					//we log the response in a fancy way
					console.table(response);

					//we make a Sweet Alert for the user to read
					Swal.fire({
						title: "Tarea creada con éxito!",
						text: "La tarea "+ body.title + " se dió de alta correctamente",
						icon: "success"
					})
				},

				//"error" gets called when something breaks up during the call of the OG function
				error: (e) => {

					//again, we print the error in a fancy way
					console.table(e);

					Swal.fire({
						title: "ERROR!",
						text: JSON.stringify(e.error.error),
						icon: "error"
					})

				},

				//finally{}, literally a try and catch type of finally{}
				complete:() =>{ console.info("Se dió de alta la tarea" + body.title + "correctamente")}
			});
		}

	}
		
}
