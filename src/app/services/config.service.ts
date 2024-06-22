import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {  }

  loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json').pipe(
      tap(config => {
        this.config = config
      }),
    );
  }

  getConfig(key: string): any {
    return this.config ? this.config[key] : null;
  }
}
