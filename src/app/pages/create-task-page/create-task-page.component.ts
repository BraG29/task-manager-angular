import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss'
})

export class CreateTaskPageComponent implements OnInit {

	//the token we generate with JWT to corroborate the user is logged in
	token: string | null = null;

	user = '';

	//just like PHP, this is how I inject something into my class, or my component in Angular's case
	//the OG object I want to inject has to have a specific attribute thingy on it
	constructor(private router: Router, private taskService:TaskService){}


	//this function gets called when the page gets rendered
	ngOnInit(): void {

		this.user = 'El WiWi';

		//we load the token with the value of the session Storage
		this.token = sessionStorage.getItem('token');

		//if the token is null, send me back to login
		if(!this.token){
			this.router.navigate(['/login']);
		}
	}
}
