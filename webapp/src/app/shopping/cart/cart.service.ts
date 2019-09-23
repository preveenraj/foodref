import { Injectable, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/food/item-info/food-item';
import { Cart } from './cart';
import { UUID } from 'angular2-uuid';
import { FoodService } from 'src/app/food/food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output() cartUpdated = new EventEmitter();
  
  foodItems:FoodItem[]; //temporary
  cart: Cart = {
    cartItems :null,
    total : 0
  };

  constructor(private foodService: FoodService) {


      //this is temporary to get the foodItems object
      // this.foodService.getFoodItems()
      // .subscribe(
      //   (foodItems:FoodItem[])=> {
      //     this.foodItems = foodItems;
      //     // console.log(this.foodItems[1]);
      //     this.cart.cartItems=  [{ itemId: 1, foodItem: this.foodItems[0], quantity:1 }];
      //     this.cart.cartItems.push({ itemId: 2, foodItem: this.foodItems[1], quantity:1 });
      //     this.cart.total = this.calculateTotalPrice();
      //   });
   }

   getCart(){
     return this.cart;
   }

   calculateTotalPrice(): number {
      let total = 0 ;
      for (const cartItem of this.cart.cartItems) {
        total += cartItem.foodItem.price;
          }
    return total;
   }

   //INVOKED BY OUTPUT INJECTOR OF CART
  addToCart(itemId:number,quantity:number){
        this.foodService.getFoodItem(itemId)
              .subscribe((foodItemtobeAdded:FoodItem)=>{
                  const uniqID = UUID.UUID();
                  if(this.cart.cartItems === null){
                    this.cart.cartItems = [{itemId: uniqID, foodItem: foodItemtobeAdded, quantity:quantity}];
                    this.cart.total = foodItemtobeAdded.price;
                  } else {
                    this.cart.cartItems.push({itemId: uniqID, foodItem: foodItemtobeAdded, quantity:quantity});
                    this.cart.total += foodItemtobeAdded.price;
                  }
              });

  }

  RemoveCartItem(cartItemId:string){
    let itemIndex = this.cart.cartItems.findIndex(cartItem => cartItem.itemId===cartItemId);
    let itemToBeRemoved = this.cart.cartItems.splice(itemIndex,1)[0];
    this.cart.total -= itemToBeRemoved.foodItem.price;
  }

  clearCart() {
    this.cart.cartItems = null;
    this.cart.total = 0;
  }


  
}
