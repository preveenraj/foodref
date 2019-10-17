import { MenuItemService } from './../../services/menu-item.service';
import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../item-info/food-item';
import { FoodService } from '../food.service';
import { CartService } from 'src/app/shopping/cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

fullFoodItems:FoodItem[]=[];
filteredFoodItems:FoodItem[]=[];
 

  constructor(private foodService: FoodService,
     private cartService: CartService,
     private router:Router,
     private authService: AuthService,
     private menuItemService: MenuItemService
     ) { }
  foodname:string;

  ngOnInit() {
    //TO GET ALL THE FOOD ITEMS INTO THE MENU COMPONENT
    this.foodService.getFoodItems()
      .subscribe(
        (data:FoodItem[]) =>  {
        this.fullFoodItems = [...data];
        this.filteredFoodItems = this.fullFoodItems;
      /*  this.filteredFoodItems = this.authService.isAdminUser() ? 
                          this.fullFoodItems: this.foodService.getFoodItemsForCustomer(this.fullFoodItems);  */
      }
      );

      this.foodService.getFilter().subscribe(
        (title: string) => {
          console.log('filter cheythu');

          this.filteredFoodItems = this.foodService.getFoodItemsFiltered(title,this.fullFoodItems);
      }
      );

     


      //SIMPLY
      this.foodService.getFoodItems().subscribe(
        data=>{
          console.log("this is from spring");
          console.log(data);
        }
      )


    }


    // ngDoCheck(){
    //   console.log("docheck vilichu")
    //   this.filteredFoodItems = this.authService.isAdminUser() ? 
    //   this.fullFoodItems: this.foodService.getFoodItemsForCustomer(this.fullFoodItems);
     
    // }

    addToCart(itemId:number){
      // this.cartService.addToCart(itemId,1);
     
      if(!this.authService.loggedInUser){
          this.router.navigate(['/cart']);
      }else{
  
        this.cartService.addToCartRest(itemId,1).subscribe(data=>{
          console.log("item added to cart: "+data);
          
        });
      }
    }

    




}
