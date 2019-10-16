import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { FoodService } from '../food/food.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser:boolean = false;
  userAuthenticated:User={username:'',firstName:'',lastName:'',role:'',accessToken:''};
  redirectUrl:string = "/";
  isAdmin:boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

  async login(username:string, password:string){
/*       this.userService.authenticate(username, password).subscribe((user: User) => {
        if (user) {
          this.loggedInUser = true;
          this.userAuthenticated = user;
          this.isAdmin = user.role === 'Admin';
        }
      }); */
      this.userService.authenticate(username, password).subscribe((data: any) => {
        console.log("this is the fetched token");
        let user:User=null;
        // tslint:disable-next-line: forin
        for (const val in data) {
          // console.log(val+ " : " +data[val]);
          console.log(data);
          console.log("data.role " +data.role.substring(5));
          console.log("data.token " +data.token);
          
          user = this.userService.getUser(data.role.substring(5).toLowerCase());
          user.accessToken = data.token;
         
        }
        if(user){
          console.log("user logged in");
          this.loggedInUser = true;
          this.userAuthenticated = user;
          console.log("user is ");
          console.log(this.userAuthenticated);
          this.isAdmin = user.role === 'Admin';

          if(this.loggedInUser) {
            this.router.navigate(['/menu']);
          } else {
            // sessionStorage.setItem('loginInvalid','true');
          }


        }
        
    
      },
      (err)=>    { 
        // sessionStorage.setItem('loginInvalid', 'true');
        // console.log('error is '+err);
        // invalid();
      }  );

    }

    logOut() {
      this.redirectUrl = '/login'; // reset to root url
      this.loggedInUser = false;
      this.userAuthenticated = {username:'',firstName:'',lastName:'',role:'',accessToken:''};
      this.isAdmin = false;
    }

    isAdminUser() {
      return this.isAdmin;
    }
}
