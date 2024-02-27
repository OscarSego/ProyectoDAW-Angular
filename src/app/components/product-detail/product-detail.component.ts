import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterOutlet, RouterModule,NavbarComponent,  CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product: Product | null = null;
  loading = false;
  listProducts: Product[] = [];

  constructor(private _productService: ProductService,
    private router: Router) {}

  ngOnInit() {
    this._productService.searchedProduct$.subscribe(
      (product: Product | null) => {
        console.log('Producto buscado:', product);
        this.product = product;
      }
    );
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
       this.router.navigate(['/dashboard'])
  
      });
    }

}
