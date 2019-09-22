import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from './food-item';


@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input() foodItem: FoodItem;
  @Output() addToCartRequested: EventEmitter<number> = new EventEmitter<number>();
  foodItemAdded:boolean = false;

  isAdmin:boolean;


  constructor() {
    

  }
  ngOnInit() {
    this.isAdmin = false;
  }

  onAddToCart(itemId:number){
      this.addToCartRequested.emit(itemId);
      this.foodItemAdded = true;
      setTimeout(() => {
        this.foodItemAdded = false;
      }, 1000);
  }


  isEditAllowed():boolean{
      return this.isAdmin;
  }




}