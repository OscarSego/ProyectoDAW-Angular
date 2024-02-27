import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private aRouter: ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit():void{

    if(this.id != 0){
      // Editar
      this.operacion = 'Editar ';
      this.editProduct(this.id);
    }
  }

  addProduct(){

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      precio: this.form.value.precio,
      stock: this.form.value.stock,
    }

    if(this.id != 0){
      //Editar
      this.loading = true;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      })
    }else{
      //Agregar
      this.loading = true;
      product.id = this.id;

      this._productService.saveProduct(product).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      })
    }
  }

  editProduct(id:number){

    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data)
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description : data.description,
        precio: data.precio,
        stock: data.stock,
      })
    })
  }

}
