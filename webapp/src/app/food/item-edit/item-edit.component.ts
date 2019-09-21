import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FoodService } from '../food.service';
import { FoodItem } from '../item-info/food-item';



@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  editForm: FormGroup;
  foodItem: FoodItem = {id: null, title: null, price: null, active: null, dateOfLaunch:new Date(), category: null, freeDelivery: null, imageUrl: null};


  constructor(private foodService: FoodService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      'title': new FormControl(this.foodItem.title, [Validators.required, Validators.maxLength(200)]),
      // 'imageUrl': new FormControl(null, [Validators.required]),
      'price': new FormControl(this.foodItem.price, [Validators.required, Validators.pattern('^[0-9]+\.[0-9]*$')]),
      'category': new FormControl(this.foodItem.category, Validators.required),
      'dateOfLaunch': new FormControl(this.foodItem.dateOfLaunch.toISOString().substring(0,10), Validators.required),
      'active': new FormControl(this.foodItem.active, Validators.required),
      'freeDelivery': new FormControl(this.foodItem.freeDelivery)
    });
    this.route.params.subscribe((params: Params) => {
      const foodItemId: number = params['itemId'];
      this.foodItem.id = foodItemId;
      this.foodService.getFoodItem(foodItemId).subscribe((foodItem: FoodItem ) => {
        if (foodItem) {
          this.editForm.patchValue({
            title: foodItem.title,
            // imageUrl: foodItem.imageUrl,
            price: foodItem.price,
            category: foodItem.category,
            dateOfLaunch: foodItem.dateOfLaunch,
            active: foodItem.active,
            freeDelivery: foodItem.freeDelivery
          });
        } else {
          // this.router.navigate(['not-found']);
        }
      });
    });
  }

  onSubmitEditForm(){
  
      this.foodService.updateFoodItem(this.foodItem);
  }

}
