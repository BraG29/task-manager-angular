import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {ConfigService} from "./config.service";

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
}
