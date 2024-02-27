import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule,ReactiveFormsModule, FormsModule, CommonModule,ProgressBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  listProducts: Product[] = [];
  loading: boolean = false;
  
  constructor(private _productService: ProductService){}

  ngOnInit(): void{
    this.getProductList();
  }

  getProductList(){
    this.loading = true;
    this._productService.listProducts().subscribe((data: any) => {

      if (data.listProducts && Array.isArray(data.listProducts)) {
        this.listProducts = data.listProducts;
        this.loading = false;
        console.log(this.listProducts)
      } else {
        console.error('El servicio no devolvió una matriz de productos válida.');
      }
    });
  }

  deleteProduct(id:number){

    this.loading = true;

    this._productService.deleteProducts(id).subscribe((data:any) => {
    
     this.getProductList();

    });
  }

}
