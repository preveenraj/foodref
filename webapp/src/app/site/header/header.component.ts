import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shopping/cart/cart.service';
import { AuthService } from '../auth.service';
import { FoodService } from 'src/app/food/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  

  constructor(private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private foodService: FoodService) { }

    isAuthenticated() {
      return this.authService.loggedInUser;
    }
  
    isAdmin() {
      return this.authService.isAdmin;
    }
  
    getUser() {
      return this.authService.userAuthenticated;
    }
  
    onLogOut() {
      this.cartService.clearCart();
      this.authService.logOut();

      this.router.navigate([this.authService.redirectUrl]);
    }

  ngOnInit() {
  }

}
