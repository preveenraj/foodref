import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemInfoComponent } from './food/item-info/item-info.component';
import { MenuComponent } from './food/menu/menu.component';
import { FoodService } from './food/food.service';
import { SearchComponent } from './food/search/search.component';
import { HttpClientModule} from '@angular/common/http';
import { BannerComponent } from './site/banner/banner.component';
import { HeaderComponent } from './site/header/header.component';
import { FooterComponent } from './site/footer/footer.component';
import { CartComponent } from './shopping/cart/cart.component';
import { ItemEditComponent } from './food/item-edit/item-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { CartService } from './shopping/cart/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemInfoComponent,
    MenuComponent,
    SearchComponent,
    BannerComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ItemEditComponent,
    SignupComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FoodService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
