import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiAppUrl:string = 'http://localhost:3001/';
  private apiUrl: string = 'api/users/';

  constructor(private httpClient:HttpClient) {}

  signIn(user: User): Observable<any>{
    console.log(`${this.apiAppUrl}${this.apiUrl}`);
    console.log(user)
    return this.httpClient.post<any>('/api/users',user);
  }

  login(user: User): Observable<any>{
    console.log(user)
    return this.httpClient.post<any>('/api/users/login',user)
  }
}
