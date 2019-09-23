import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from './food-item';
import { AuthService } from 'src/app/site/auth.service';


@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input() foodItem: FoodItem;
  @Output() addToCartRequested: EventEmitter<number> = new EventEmitter<number>();
  foodItemAdded:boolean = false;



  constructor(private authService:AuthService) {
    

  }
  ngOnInit() {
    
  }

  onAddToCart(itemId:number){
      this.addToCartRequested.emit(itemId);
      this.foodItemAdded = true;
      setTimeout(() => {
        this.foodItemAdded = false;
      }, 1000);
  }


  isEditAllowed():boolean{
    return this.authService.loggedInUser && this.authService.isAdminUser();
  }




}