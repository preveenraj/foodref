import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../item-info/food-item';
import { FoodService } from '../food.service';
import { CartService } from 'src/app/shopping/cart/cart.service';
import { Router } from '@angular/router';


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
     private router:Router) { }
  foodname:string;

  ngOnInit() {
    //TO GET ALL THE FOOD ITEMS INTO THE MENU COMPONENT
    this.foodService.getFoodItems()
      .subscribe(
        (data:FoodItem[]) =>  {
        this.fullFoodItems = [...data];
        this.filteredFoodItems = [...data];
        console.log(this.fullFoodItems);
      }
      );

      this.foodService.getFilter().subscribe(
        (title: string) => {
          this.filteredFoodItems = this.foodService.getFoodItemsFiltered(title,this.fullFoodItems);
      }
      );




    }

    addToCart(itemId:number){
      this.cartService.addToCart(itemId,1);
      // this.router.navigate(['/cart']);
    }

}
