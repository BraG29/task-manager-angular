import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ITask } from '../models/task';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

	getTasks(id: number | undefined): Observable<ITask[]>{
		return this.http.get<ITask[]>(this.config.getConfig('apiUrl') + '/tasksByUser/' + id);
	}
	
	getTask(id:number | undefined): Observable<ITask>{
		return this.http.get<ITask>(this.config.getConfig('apiUrl') + '/tasks/' + id); 
	}

	updateTask(taskDTO: Partial<any>): Observable<any>{
		console.log(taskDTO);
		return this.http.put<ITask>(this.config.getConfig('apiUrl')+'/tasks/update', taskDTO);
	}

	deleteTask(taskId: number , userId: number | undefined) : Observable<any>{

		const url = `${this.config.getConfig('apiUrl')}/tasks/delete?userId=${userId}&taskId=${taskId}`;
    
		return this.http.delete(url, { observe: 'response', responseType: 'text' }).pipe(
			catchError((error: HttpErrorResponse) => {
			  console.error('Error en la solicitud:', error);
		
			  // pelea con el mensaje de respuesta
			  let errorMessage = 'Algo salió mal';
			  
			  try {
				const errorObject = JSON.parse(error.error);
				errorMessage = errorObject.message || errorMessage;
			  } catch (e) {
				console.error('No se pudo analizar la respuesta como JSON:', e);
			  }
		
			  return throwError(() => new Error(errorMessage));
			})
		  );
	}


}
