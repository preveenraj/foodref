import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './shopping/cart/cart.component';
import { MenuComponent } from './food/menu/menu.component';
import { ItemEditComponent } from './food/item-edit/item-edit.component';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { AuthGuardService } from './site/auth-guard.service';
import { NotFoundComponent } from './site/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'edit-item/:itemId', component: ItemEditComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
