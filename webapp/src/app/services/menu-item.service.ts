import { FoodItem } from './../food/item-info/food-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  menuUrl:string = environment.baseUrl;
  username="user";
  password="pwd";
  headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
  constructor(private http: HttpClient) { }


  getAllMenuItems():Observable<FoodItem[]> {
    
    return this.http.get<FoodItem[]>(this.menuUrl,{headers:this.headers});
  }
}
