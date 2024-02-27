import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { Comments } from '../../interfaces/comments';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  comment: Comments | null = null;
  listComment: Comments[] = [];

  constructor(private _commentService: CommentsService,
    private router: Router,){}

    ngOnInit(
    ) {console.log('Llego')
    this.getCommentList()}

    getCommentList(){

      this._commentService.listComments().subscribe((data: any) => {
  
          this.listComment = data;
          console.log(this.listComment)

      });
    }

    
    deleteComment(id:number){
  
      this._commentService.deleteComment(id).subscribe((data:any) => {
      
       this.getCommentList();
       this.router.navigate(['/comments'])
  
      });
    }
    
}
