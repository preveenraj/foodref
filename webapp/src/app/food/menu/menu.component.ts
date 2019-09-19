import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../item-info/food-item';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

fullFoodItems:FoodItem[]=[];
filteredFoodItems:FoodItem[]=[];
 

  constructor(private foodService: FoodService) { }
  foodname:string;

  ngOnInit() {
    //TO GET ALL THE FOOD ITEMS INTO THE MENU COMPONENT
    this.foodService.getFoodItems()
      .subscribe((data:FoodItem[]) =>  {
        this.fullFoodItems = [...data];
        this.filteredFoodItems = [...data];
      });

      this.foodService.getFilter().subscribe((obj: {title: string }) => {
        if(obj.title!=''){
          const result = this.fullFoodItems.filter(foodItem => foodItem.title.toLowerCase().includes(obj.title.toLowerCase()));
          this.filteredFoodItems = result ? result : [];
        }
        else {
            this.filteredFoodItems = [...this.fullFoodItems];
        }
      }
      );




    }

}
