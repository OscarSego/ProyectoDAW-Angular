import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddEditCommentComponent } from './components/add-edit-comment/add-edit-comment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signin', component: SignInComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'product', component: ProductDetailComponent},
    { path: 'comments', component: CommentsComponent},
    { path: 'add', component: AddEditProductComponent},
    { path: 'edit/:id', component: AddEditProductComponent},
    { path: 'comments/:id', component: AddEditCommentComponent},
    { path: 'addComment', component: AddEditCommentComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];
