import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  formSubmitted:boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20)], this.isUsernameTaken),
      'firstname': new FormControl(null, [Validators.required, Validators.pattern('^[a-z A-Z]+$'), Validators.maxLength(50)]),
      'lastname': new FormControl(null, [Validators.required, Validators.pattern('^[a-z A-Z]+$'), Validators.maxLength(50)]),
      'password': new FormControl(null, [Validators.required,  Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, this.matchConfirmPassword.bind(this)]),
    });
  }
  
  isUsernameTaken(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => { // should be remote http call to REST service
      setTimeout(() => {
        if (formControl.value === 'preveen') {
          resolve({ 'userNameTaken': true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
  
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
    this.formSubmitted = true;

    const newUser = { username: this.signupForm.value['username'], 
                      firstName: this.signupForm.value['firstname'], 
                      lastName: this.signupForm.value['lastname'], 
                      password: this.signupForm.value['password'], 
                      role: 'Customer' };
    this.userService.addUser(newUser);
    this.signupForm.reset();
    
    
  }

 
 

}
