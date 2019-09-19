import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from './food-item';


@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input() foodItem: FoodItem;
  




  constructor() {
    

  }
  ngOnInit() {
  }



}