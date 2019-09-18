import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../item-info/food-item';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

@Input() foodItems:FoodItem[];
 

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getFoodItems()
      .subscribe(data => this.foodItems = data);
    console.log(this.foodItems);
  }

}
