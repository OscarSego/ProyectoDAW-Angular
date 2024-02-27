import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  searchForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private _productService: ProductService){
      this.searchForm = this.fb.group({
        name: ['']
      });
    }

  searchProduct(){

    const name = this.searchForm.get('name')?.value;

    if(name){
      this._productService.searchProduct(name).subscribe(data => {
        console.log(data)
        this._productService.setSearchedProduct(data);
        this.router.navigate(['/product']);
      })
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
