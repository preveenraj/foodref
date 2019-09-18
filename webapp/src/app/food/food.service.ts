import { Injectable, Input } from '@angular/core';
import { FoodItem } from './item-info/food-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private food_url = '/assets/data/fooditems.json';
  fooditems: FoodItem[];
  constructor(private http: HttpClient) { }

  getFoodItems():Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.food_url);
  }









  /* getFoodItems(active: boolean, launchDate: Date): FoodItem[]{
    return this.fooditems;
  } */

  /* getFoodItem(name: string): FoodItem{

    return this.fooditems[1];
  } */
}
