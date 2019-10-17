import { UserService } from './../site/user.service';
import { Injectable, Input } from '@angular/core';
import { FoodItem } from './item-info/food-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Observer, of } from 'rxjs';
import { AuthService } from '../site/auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FoodService {


  menuUrl:string = environment.baseUrl;
  // username="user";
  // password="pwd";
  // headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username+":"+this.password) });
  

  private food_url = '/assets/data/fooditems.json';
  fullFoodItems: FoodItem[];
//   fullFoodItems: FoodItem[]=[
//     {id:1,title:"Sandwich",price:99,active:true,dateOfLaunch:new Date('2017-03-15'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"},
//   {id:2,title:"Burger",price:129,active:true,dateOfLaunch:new Date('2017-12-23'),category:"Main Course",freeDelivery:false,imageUrl:"https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
//   {id:3,title:"Pizza",price:149,active:true,dateOfLaunch:new Date('2019-08-21'),category:"Main Course",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"},
//   {id:4,title:"French Fries",price:57,active:false,dateOfLaunch:new Date('2017-07-02'),category:"Starter",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//   {id:5,title:"Chocolate Brownie",price:32,active:true,dateOfLaunch:new Date('2022-11-02'),category:"Dessert",freeDelivery:true,imageUrl:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80"}
// ];
  filter = new Subject();

  getFilter():Subject<Object>{
    return this.filter;
  }





  constructor(private http: HttpClient, private authService: AuthService) { 
    this.getFoodItems().subscribe(data=>{
      this.fullFoodItems=data;
      // console.log("from food service");
      // console.log(this.fullFoodItems);
    });
  }

  getFoodItems():Observable<FoodItem[]> {

    if(this.authService.userAuthenticated.username===''){
    return this.http.get<FoodItem[]>(this.menuUrl);
    }
    else {
      const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
      return this.http.get<FoodItem[]>(this.menuUrl, {headers});
    }
    // return of (this.fullFoodItems);
  }

  getFoodItemsForCustomer(foodItems:FoodItem[]):FoodItem[]{
    const today = new Date();
    const customerFoodItems:FoodItem[] = foodItems.filter(foodItem => {
        return foodItem.active && new Date(foodItem.dateOfLaunch) <= today;
        // return foodItem.active;
    });
    // console.log("customer food items: "+customerFoodItems)
    return customerFoodItems;
  }

  
  getFoodItemsFiltered(title: string,fullFoodItems:FoodItem[]): FoodItem[] {
    console.log("inside filter and isAdmin: "+ this.authService.isAdminUser());
    // fullFoodItems = this.authService.isAdminUser() ? fullFoodItems: this.getFoodItemsForCustomer(fullFoodItems);
    if(title!=''){
      const result = fullFoodItems.filter(foodItem => foodItem.title.toLowerCase().includes(title.toLowerCase()));
      return result ? result : [];
    } else {
        return fullFoodItems;
    }
  } 
  
  
  getFoodItem(itemId: number):Observable<any>{
/*     return Observable.create((observer: Observer<FoodItem>)=> {
      this.getFoodItems().subscribe((foodItems)=>{
              const foodItem = foodItems.find( foodItem => foodItem.id == itemId);
              observer.next(foodItem);
      });
    }); */
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
    return this.http.get<FoodItem>(this.menuUrl + '/' + itemId,{headers});
  }


  updateFoodItem(foodItem: FoodItem):Observable<boolean>{
    //UPDATE THE TEMPORARY FOOD ITEM LIST IN THE COMPONENT
/*     const itemId = this.fullFoodItems.findIndex(foodItemOriginal => foodItemOriginal.id === foodItem.id);
    console.log(foodItem)
    this.fullFoodItems[itemId] = foodItem; */
    
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.userAuthenticated.accessToken });
    return this.http.put<boolean>(this.menuUrl,foodItem,{headers});
    
  }


  









  /* getFoodItems(active: boolean, launchDate: Date): FoodItem[]{
    return this.fooditems;
  } */

  
}
