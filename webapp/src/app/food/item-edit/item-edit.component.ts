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


  constructor(private foodService:FoodService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      // 'imageUrl': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+\.[0-9]*$')]),
      'category': new FormControl(null, Validators.required),
      'dateOfLaunch': new FormControl(null, Validators.required),
      'active': new FormControl(null, Validators.required),
      'freeDelivery': new FormControl(null)
    });
    this.route.params.subscribe((params: Params) => {
      const foodItemId:number = params['itemId'];
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

  }

}
