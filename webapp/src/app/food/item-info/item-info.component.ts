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




  constructor() {
    

  }
  ngOnInit() {
  }

  onAddToCart(itemId:number){
      this.addToCartRequested.emit(itemId);
  }



}