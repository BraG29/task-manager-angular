import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {ConfigService} from "./config.service";
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  login(email: string, password: string): Observable<any> {
    console.log(`email: ${email}, password: ${password}`);

    //Como json
    let body = {
      email: email,
      password: password
    }

    //Como form-data
    // let formData: FormData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);

    return this.http.post(this.configService.getConfig('apiUrl')+'/login', body);
  }

  // TODO: Llevar estas operaciones a un UserService
  createUser(userDTO: Partial<IUser>): Observable<IUser>{
    return this.http.post<IUser>(this.configService.getConfig('apiUrl')+'/users', userDTO);
  }

  getUser(id: number | undefined) : Observable<IUser>{
    return this.http.get<IUser>(this.configService.getConfig('apiUrl')+'/users/' + id);
  }

  updateUser(userDTO: Partial<IUser>): Observable<IUser>{
    return this.http.put<IUser>(this.configService.getConfig('apiUrl')+'/updateUser', userDTO);
  }

}
