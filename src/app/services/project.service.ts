import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IProject} from "../models/project";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  projectsByUser(userId: number): Observable<IProject[]> {
    const url = `${this.configService.getConfig('apiUrl')}/GetProjectDataByUser/${userId}`
    return this.http.get<IProject[]>(url);
  }

}
