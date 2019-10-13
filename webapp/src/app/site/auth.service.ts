import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { FoodService } from '../food/food.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser:boolean = false;
  userAuthenticated:User;
  redirectUrl:string = "/";
  isAdmin:boolean = false;

  constructor(private userService: UserService) { }

  login(username:string, password:string){
      this.userService.authenticate(username, password).subscribe((user: User) => {
        if (user) {
          this.loggedInUser = true;
          this.userAuthenticated = user;
          this.isAdmin = user.role === 'Admin';
        }
      });
    }

    logOut() {
      this.redirectUrl = '/login'; // reset to root url
      this.loggedInUser = false;
      this.userAuthenticated = null;
      this.isAdmin = false;
    }

    isAdminUser() {
      return this.isAdmin;
    }
}
