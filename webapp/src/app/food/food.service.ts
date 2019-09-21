import { Injectable, Input } from '@angular/core';
import { FoodItem } from './item-info/food-item';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private food_url = '/assets/data/fooditems.json';
  fullFoodItems: FoodItem[]=[
    {id:1,title:"Sandwich",price:99,active:true,dateOfLaunch:new Date('03/15/2017'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"},
  {id:2,title:"Burger",price:129,active:true,dateOfLaunch:new Date('2017/01/01'),category:"Main Course",freeDelivery:false,imageUrl:"https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
  {id:3,title:"Pizaa",price:149,active:true,dateOfLaunch:new Date('08/21/2017'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"},
  {id:4,title:"French Fries",price:57,active:false,dateOfLaunch:new Date('07/02/2017'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  {id:5,title:"Chocolate Brownie",price:32,active:true,dateOfLaunch:new Date('11/02/2034'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80"}
];
  filter = new Subject();

  getFilter():Subject<Object>{
    return this.filter;
  }


  constructor(private http: HttpClient) { }

  getFoodItems():Observable<FoodItem[]> {
    // return this.http.get<FoodItem[]>(this.food_url);
    return of (this.fullFoodItems);
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
    const itemId = this.fullFoodItems.findIndex(foodItemOriginal => foodItemOriginal.id === foodItem.id);
    this.fullFoodItems[itemId] = foodItem;
  }
  









  /* getFoodItems(active: boolean, launchDate: Date): FoodItem[]{
    return this.fooditems;
  } */

  
}
