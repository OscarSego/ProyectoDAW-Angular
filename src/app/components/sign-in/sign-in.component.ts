import { Component, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, SpinnerComponent, CommonModule ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {

  username: string = "";
  password:string = "";
  confirmPassword:string = "";
  loading: boolean = false;

  ngOnInit(): void {

  }

  constructor(
    private _userService: UserService,
    private router: Router
  ){}

  addUser(){

    // Validar que el usuario ingrese valore

    if(this.username == "" || this.password == "" || this.confirmPassword == ""){
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validamos que las password sean iguales

    if(this.password != this.confirmPassword){
      alert("Las password no coinciden");
      return;
    }

    // Creamos el objeto

    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;

    this._userService.signIn(user).subscribe(data => {
      this.loading = false;
      this.router.navigate(['/login']);
    }, (error: HttpErrorResponse) =>{

      if(error.error.msg){
        alert(error.error.msg)
      }
      
      this.loading = false;
    })

  }

}
