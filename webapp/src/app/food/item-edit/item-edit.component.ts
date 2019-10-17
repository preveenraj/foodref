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
  newFoodItem: FoodItem = {id: null, title: null, price: null, active: null, dateOfLaunch:new Date('2017-02-02'), category: null, freeDelivery: null, imageUrl: null};
  itemEditted:boolean=false;

  constructor(private foodService: FoodService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      'title': new FormControl(this.newFoodItem.title, [Validators.required, Validators.maxLength(200)]),
      'imageUrl': new FormControl(null),
      'price': new FormControl(this.newFoodItem.price, [Validators.required, Validators.pattern('^[0-9]+\.[0-9]*$')]),
      'category': new FormControl(this.newFoodItem.category, Validators.required),
      'dateOfLaunch': new FormControl(this.newFoodItem.dateOfLaunch.toISOString().substring(0,10), Validators.required),
      'active': new FormControl(this.newFoodItem.active, Validators.required),
      'freeDelivery': new FormControl(this.newFoodItem.freeDelivery)
    });
    this.route.params.subscribe((params: Params) => {
      const foodItemId: number = params['itemId'];
      this.newFoodItem.id = +foodItemId;
      this.foodService.getFoodItem(foodItemId).subscribe((foodItem: FoodItem ) => {
        foodItem.dateOfLaunch = new Date(foodItem.dateOfLaunch);
        foodItem.dateOfLaunch.setDate(foodItem.dateOfLaunch.getDate()+1);
        if (foodItem) {
          this.editForm.patchValue({
            title: foodItem.title,
            imageUrl: foodItem.imageUrl,
            price: foodItem.price,
            category: foodItem.category,
            dateOfLaunch: foodItem.dateOfLaunch.toISOString().substring(0, 10),
            active: foodItem.active,
            freeDelivery: foodItem.freeDelivery
          });
        } else {
          // this.router.navigate(['not-found']);
        }
      });
    });
  }
  
  get title() {
    return this.editForm.get('title');
  }

  get foodItemURL() {
    return this.editForm.get('imageUrl');
  }
  get price() {
    return this.editForm.get('price');
  }
  get active() {
    return this.editForm.get('active');
  }
  get freeDelivery() {
    return this.editForm.get('freeDelivery');
  }
  get dateOfLaunch() {
    return this.editForm.get('dateOfLaunch');
  }


  onSubmitEditForm(){
    this.newFoodItem = {
      id: this.newFoodItem.id, title: this.editForm.value['title'], price: +this.editForm.value['price'],
      active: this.editForm.value['active'], 
      dateOfLaunch: new Date(this.editForm.value['dateOfLaunch']), 
      freeDelivery: this.editForm.value['freeDelivery'],
      category: this.editForm.value['category'],
       imageUrl: this.editForm.value['imageUrl']
    };
      this.foodService.updateFoodItem(this.newFoodItem).subscribe(saveFlag=>{
        this.itemEditted = saveFlag ? true : false;
        setTimeout(() => {
          this.router.navigate(['/menu']);
        }, 2000);
      });
 
  }

}
