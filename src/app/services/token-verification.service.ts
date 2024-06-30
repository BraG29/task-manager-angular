import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenVerificationService {

  constructor() { }

  canActivate(): boolean{
    return sessionStorage.getItem('token') != null;
  }
}
