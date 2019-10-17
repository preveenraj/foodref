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

  cartUpdated;
  cart: Cart = {
    cartItems :null,
    total : 0
  };

  constructor(private cartService: CartService) { }

  ngOnInit() {
  
      this.getCart();

    }

    getCart(){
      this.cartService.getCart().subscribe(data=>{
        this.cart = data;
        // console.log(this.cart);
      });
    }

    onRemoveCartItem(cartItemId:string){
      this.cartService.RemoveCartItem(cartItemId).subscribe(data=>{
        this.cartUpdated=data;
        this.getCart();

      });
    }

}
