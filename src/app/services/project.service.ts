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
    const url = `${this.configService.getConfig('apiUrl')}/GetProjectDataByUser/${userId}`;
    return this.http.get<IProject[]>(url);
  }

  getProjectData(id: number | undefined) : Observable<IProject>{
    return this.http.get<IProject>(this.configService.getConfig('apiUrl') + '/GetProjectData/' + id);
  }

  createProject(project: Partial<IProject>): Observable<any> {
    const url = `${this.configService.getConfig('apiUrl')}/CreateProject`;
    return this.http.post(url, project);
  }

  updateProject(project: Partial<IProject>, userId: number): Observable<any> {
    const url = `${this.configService.getConfig('apiUrl')}/EditProject/${userId}`;
    return this.http.put(url, project);
  }
}
