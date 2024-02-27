import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Comment } from '@angular/compiler';
import { Comments } from '../../interfaces/comments';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-edit-comment',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-comment.component.html',
  styleUrl: './add-edit-comment.component.css'
})
export class AddEditCommentComponent {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _commentService: CommentsService,
    private router: Router,
    private aRouter: ActivatedRoute){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      comentario: ['', Validators.required],
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit():void{

    if(this.id != 0){
      // Editar
      this.operacion = 'Editar ';
      this.editComment(this.id);
    }
  }

  
  addComments(){

    const comment: Comments = {
      nombre: this.form.value.nombre,
      comentario: this.form.value.comentario,
    }

    if(this.id != 0){
      //Editar
      this.loading = true;
      this._commentService.updateComments(this.id, comment).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/comments']);
      })
    }else{
      //Agregar
      this.loading = true;
      comment.id = this.id;

      this._commentService.saveComment(comment).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/comments']);
      })
    }
  }

  editComment(id:number){

    this.loading = true;
    this._commentService.getComment(id).subscribe((data: Comments) => {
      console.log(data)
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        comentario : data.comentario,
      })
    })
  }

}
