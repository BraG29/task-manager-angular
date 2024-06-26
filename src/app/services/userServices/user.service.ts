import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {ConfigService} from "../config.service";
import { IUser } from '../../models/user';
import { ITask } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  createUser(userDTO: Partial<IUser>): Observable<IUser>{
    return this.http.post<IUser>(this.configService.getConfig('apiUrl')+'/users', userDTO);
  }

  getUser(id: number | undefined) : Observable<IUser>{
    return this.http.get<IUser>(this.configService.getConfig('apiUrl')+'/users/' + id);
  }

  updateUser(userDTO: Partial<IUser>): Observable<IUser>{
    return this.http.put<IUser>(this.configService.getConfig('apiUrl')+'/updateUser', userDTO);
  }
  

  //esto va a task service //administrador
  getTasks(id: number | undefined): Observable<ITask[]>{
    return this.http.get<ITask[]>(this.configService.getConfig('apiUrl') + '/tasksByUser/' + id);
  }

  getTask(id:number | undefined): Observable<ITask>{
   return this.http.get<ITask>(this.configService.getConfig('apiUrl') + '/tasks/' + id); 
  }

  //esto va a project service
  getProjectData(id: number | undefined) : Observable<any>{
    return this.http.get<any>(this.configService.getConfig('apiUrl') + '/GetProjectData/' + id);
  }
}
