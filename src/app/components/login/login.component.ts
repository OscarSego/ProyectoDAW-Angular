import { Component, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, SpinnerComponent, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class LoginComponent {

  username:string = "";
  password:string = "";
  loading:boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router 
  ){}

  login(){

    // Validamos que el usuario ingrese datos
    if(this.username == '' || this.password == ''){
      alert("Los campos son obligatorios");
      return
    }

    // Creamos el body

    const user:User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (token) =>{
        localStorage.setItem('token',JSON.stringify(token))
        this.router.navigate(['/dashboard'])
        console.log(token)
      },
      error: (e: HttpErrorResponse) =>{
        if(e.error.msg){
          alert(e.error.msg)
          this.loading = false;
        }
      }
    })

  }
}
