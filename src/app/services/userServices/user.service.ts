import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {ConfigService} from "../config.service";
import { IUser } from '../../models/user';
import { ITask } from '../../models/task';
import { IProject } from '../../models/project';
import {IInvitation} from "../../models/invitation";

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

  inviteUser(invitation: Partial<IInvitation>){
    const url = `${this.configService.getConfig('apiUrl')}/sendInvitation`;
    return this.http.post(url, invitation);
  }

}
