import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ITask } from '../models/task';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class TaskService {

	//we inject we dependencies we're gonna use
	constructor(private http: HttpClient, private config: ConfigService){ }

	//getTasksByUser()
	//  createUser(userDTO: Partial<IUser>): Observable<IUser>{
	//	return this.http.post<IUser>(this.configService.getConfig('apiUrl')+'/users', userDTO);
	//	}
	
	 createTask(taskDTO: Partial<ITask>): Observable<any>{
		//we are basically saying to the http client to do a post request, sending the ITask object
		//utilizing the configuration of the ConfigService to get the correct endpoint
		return this.http.post<ITask>(this.config.getConfig('apiUrl')+'/tasks/create', taskDTO);
	}

}
