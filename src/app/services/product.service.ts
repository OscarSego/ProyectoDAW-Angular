import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiAppUrl:string = 'http://localhost:3001/';
  private apiUrl: string = '/api/products';

  private searchedProductSubject = new BehaviorSubject<Product | null>(null);
  searchedProduct$ = this.searchedProductSubject.asObservable();


  constructor(private httpClient:HttpClient,
    private router: Router, ) {}

  listProducts(): Observable<Product[]>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Product[]>('/api/products', {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }
      ))
  }

  deleteProducts(id:number): Observable<void>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<void>(`/api/products/${id}`, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/dashboard']);
        }
        return throwError(error);
      }
      ))
  }

  saveProduct(product:Product): Observable<void>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<void>('/api/products', product, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/dashboard']);
        }
        return throwError(error);
      }
      ))
  }

  getProduct (id:number): Observable<Product>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Product>(`/api/products/${id}`, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/dashboard']);
        }
        return throwError(error);
      }
      ))
  }

  updateProduct(id:number, product:Product): Observable<void>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<void>(`/api/products/${id}`, product, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/dashboard']);
        }
        return throwError(error);
      }
      ))
  }

  searchProduct (name:string): Observable<Product>{

    const token = this.extractToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Product>(`/api/products/nombre/${name}`, {headers: headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/dashboard']);
        }
        return throwError(error);
      }
      ))
  }

  setSearchedProduct(product: Product | null) {
    this.searchedProductSubject.next(product);
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
