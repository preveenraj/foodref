import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartService } from 'src/app/shopping/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLoginValid: boolean = true;
  authSource: string;
  submitClicked: boolean = false;

  

  constructor(public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService:CartService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.authSource = params['from'];
    });
  }


  
  onSubmit(loginForm: NgForm) {
    this.submitClicked = true;
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    if (username === 'yoyoboy') { // temporary to show the invalid user login
      this.isLoginValid = false;
    } else {
      this.authService.login(username, password);
     
      // if(this.authService.isAdminUser() && this.authService.loggedInUser){
      //   this.router.navigate(['/menu']);
      // } else
      
 /*       if(this.authService.loggedInUser) {
        this.router.navigate(['/menu']);
      } else {
      this.isLoginValid = false;
      } */
      
      this.authService.getIsLoginValidSubject().subscribe(invalidLogin=>{
        if(invalidLogin) {
          this.isLoginValid=false;
        }else{
         
        }
      })
    /*   setTimeout(()=>{
        if(!this.authService.loggedInUser) {
          this.isLoginValid=false;
        }
      }
      ,4000); */
   
    
    }
  }

/*    invalid(){
     console.log("login invalid is"+sessionStorage.getItem('loginInvalid'));
    if(sessionStorage.getItem('loginInvalid')==='true') {
      this.isLoginValid=false;
    } */
  

}
