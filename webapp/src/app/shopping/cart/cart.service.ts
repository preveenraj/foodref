import { Injectable, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/food/item-info/food-item';
import { Cart } from './cart';
import { UUID } from 'angular2-uuid';
import { FoodService } from 'src/app/food/food.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../site/auth.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  @Output() cartUpdated = new EventEmitter();
  
  cartUrl:string = environment.cartUrl;
  foodItems:FoodItem[]; //temporary
  cart: Cart = {
    cartItems :null,
    total : 0
  };
  
  alreadyExists:boolean = false;
  foodItemAdded:boolean = false;

  IdOffoodItemtobeAdded =-1;

  //hardcoded old one
  foodItemtobeAdded:FoodItem =  {id:-1,title:null,price:null,active:null,dateOfLaunch:new Date('03/15/2017'),
                                  category:null,freeDelivery:true,imageUrl:null};
 
  
  

  constructor(private http:HttpClient,
              private foodService: FoodService,
              private authService: AuthService) {

                // console.log("inside cart service constructor");
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

  
   getCart():Observable<Cart>{
     
    if(!this.authService.loggedInUser){
     return of (this.cart);
  } else {
     const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
     return this.http.get<Cart>(this.cartUrl+'/'+'1', {headers});
    }
   }

   //unused method
   calculateTotalPrice(): number {
      let total = 0 ;
      for (const cartItem of this.cart.cartItems) {
        total += cartItem.price;
          }
    return total;
   }
   
   addToCartRest(itemId:number,quantity:number):Observable<boolean>{
      this.IdOffoodItemtobeAdded =+ itemId;
      this.foodItemAdded = true;
          setTimeout(() => {
            this.foodItemAdded = false;
          }, 1000);
    const headers = new HttpHeaders({ Authorization: 'Bearer '+this.authService.userAuthenticated.accessToken});
    return this.http.post<boolean>(this.cartUrl+'/'+'1'+'/'+itemId,"", {headers});
   }


 /*   //INVOKED BY OUTPUT INJECTOR OF CART
  addToCart(itemId:number,quantity:number){
        this.foodService.getFoodItem(itemId)
              .subscribe((foodItemtobeAdded:FoodItem)=>{
                  const uniqID = UUID.UUID();
                  this.foodItemtobeAdded = foodItemtobeAdded;
                  if(this.cart.cartItems === null){
                    this.cart.cartItems = [{itemId: uniqID, foodItem: foodItemtobeAdded, quantity:quantity}];
                    this.cart.total = foodItemtobeAdded.price;
                    this.foodItemAdded = true;
                    setTimeout(() => {
                      this.foodItemAdded = false;
                    }, 1000);
                  } else {

                    if(!this.cart.cartItems.some(cartItem => cartItem.foodItem.id == foodItemtobeAdded.id)){
                      this.cart.cartItems.push({itemId: uniqID, foodItem: foodItemtobeAdded, quantity:quantity});
                      this.cart.total += foodItemtobeAdded.price;
                      this.foodItemAdded = true;
                      setTimeout(() => {
                        this.foodItemAdded = false;
                      }, 1000);
                    }  else {
                      this.alreadyExists = true;
                      setTimeout(() => {
                        this.alreadyExists = false;
                      }, 1000);
                    }
                  }
              });

  }
 */

 //hardcoded implementation of remove
  RemoveCartItem(cartItemId:string):Observable<boolean>{
/*     let itemIndex = this.cart.cartItems.findIndex(cartItem => cartItem.itemId===cartItemId);
    let itemToBeRemoved = this.cart.cartItems.splice(itemIndex,1)[0];
    this.cart.total -= itemToBeRemoved.foodItem.price; */
    const headers = new HttpHeaders({ Authorization: 'Bearer '+this.authService.userAuthenticated.accessToken});
    return this.http.delete<boolean>(this.cartUrl+'/'+'1'+'/'+cartItemId, {headers});

  }



  clearCart() {
    this.cart.cartItems = null;
    this.cart.total = 0;
  }


  
}
