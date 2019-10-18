import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error:string = '';
  signupForm: FormGroup;
  formSubmitted:boolean = false;
  userList:User[];
  constructor(private userService: UserService,
              private router: Router) {
               }

  ngOnInit() {
    this.userList = this.userService.userList;
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(4)], this.loginAsyncValidator(this.userService)),
      'firstname': new FormControl(null, [Validators.required, Validators.pattern('^[a-z A-Z]+$'), Validators.maxLength(50)]),
      'lastname': new FormControl(null, [Validators.required, Validators.pattern('^[a-z A-Z]+$'), Validators.maxLength(50)]),
      'password': new FormControl(null, [Validators.required,  Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, this.matchConfirmPassword.bind(this)]),
    });
  }

  loginAsyncValidator = 
  (userService: UserService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => userService.isUserNameTaken(input.value)),
        map(res => {
          return res.isLoginAvailable ? null : {userNameTaken: true}
        })
      );
    };
  };
  
  //hardcoded old implementation
 /*  isUsernameTaken(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => { // should be remote http call to REST service
      setTimeout(() => {
        // if (formControl.value === 'preveen') {
        if (this.userList.some(user=> user.username == formControl.value)) {
          resolve({ 'userNameTaken': true });
        } else {
          resolve(null);
        }
      }, 1000);


    });
    return promise;
  } */
  
  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signupForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signupForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }
  get username() {
    return this.signupForm.get('username');
  }
  get firstname() {
    return this.signupForm.get('firstname');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }
  get password() {
    return this.signupForm.get('password');
  }
  
  onSubmitSignUp(){
    

    const newUser = { username: this.signupForm.value['username'], 
                      firstName: this.signupForm.value['firstname'], 
                      lastName: this.signupForm.value['lastname'], 
                      password: this.signupForm.value['password'], 
                      role: 'Customer' };
    this.userService.addUser(newUser).subscribe(data => {
        // console.log("new user added: "+data);
        this.userService.userList.push(newUser);
        // console.log(this.userService.userList);
        this.signupForm.reset();
        this.formSubmitted = true;
    
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
    },
    error=>{
      // console.log(error);
      if (error.error != null) {
      this.error = error.error.message;
      // console.log("error is: "+this.error)

      }
    }
    );
  }
}
