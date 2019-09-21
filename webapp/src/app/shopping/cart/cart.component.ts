import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { FoodService } from 'src/app/food/food.service';
import { FoodItem } from 'src/app/food/item-info/food-item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit() {
      this.cart = this.cartService.getCart();
   
    }

    onRemoveCartItem(cartItemId:string){
      this.cartService.RemoveCartItem(cartItemId);
    }

}
