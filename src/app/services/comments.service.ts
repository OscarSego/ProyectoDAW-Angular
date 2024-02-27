import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient,
    private router: Router) { }

  listComments(): Observable<Comments[]>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Comments[]>('http://localhost:8080/api/comentario', {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        console.error('Error al obtener comentarios:', error);
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }
      ))
  }

  deleteComment(id:number): Observable<void>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<void>(`http://localhost:8080/api/comentario/${id}`, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/comments']);
        }
        return throwError(error);
      }
      ))
  }

  saveComment(comment:Comments): Observable<void>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<void>('http://localhost:8080/api/comentario', comment, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/comments']);
        }
        return throwError(error);
      }
      ))
  }

  getComment (id:number): Observable<Comments>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Comments>(`http://localhost:8080/api/comentario/${id}`, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/comments']);
        }
        return throwError(error);
      }
      ))
  }

  updateComments(id:number, comment:Comments): Observable<void>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<void>(`http://localhost:8080/api/comentario/${id}`, comment, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/comments']);
        }
        return throwError(error);
      }
      ))
  }

  private extractToken(): string {
    const tokenData = localStorage.getItem('token');
    
    if (tokenData) {
      try {
        const tokenObject = JSON.parse(tokenData);
        return tokenObject.token;
      } catch (error) {
        console.error('Error parsing token data:', error);
      }
    }

    return '';
  }
}
