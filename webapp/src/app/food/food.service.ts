import { Injectable, Input } from '@angular/core';
import { FoodItem } from './item-info/food-item';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private food_url = '/assets/data/fooditems.json';
  // fullFoodItems: FoodItem[];
  filter = new Subject();

  getFilter():Subject<Object>{
    return this.filter;
  }


  constructor(private http: HttpClient) { }

  getFoodItems():Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.food_url);
  }

  
  getFoodItemsFiltered(title: string,fullFoodItems:FoodItem[]): FoodItem[] {
    if(title!=''){
      const result = fullFoodItems.filter(foodItem => foodItem.title.toLowerCase().includes(title.toLowerCase()));
      return result ? result : [];
    }
    else {
        return fullFoodItems;
    }
  }
  
  
  getFoodItem(itemId: number):Observable<any>{
    return Observable.create((observer: Observer<FoodItem>)=> {
      this.getFoodItems().subscribe((foodItems)=>{
              const foodItem = foodItems.find( foodItem => foodItem.id == itemId);
              observer.next(foodItem);
      });
    


    });
  }


  updateFoodItem(foodItem: FoodItem){
    //UPDATE THE TEMPORARY FOOD ITEM LIST IN THE COMPONENT
  }
  









  /* getFoodItems(active: boolean, launchDate: Date): FoodItem[]{
    return this.fooditems;
  } */

  
}
