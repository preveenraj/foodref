import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  formSubmitted:boolean = false;
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20)], this.isUsernameTaken),
      'firstname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(50)]),
      'lastname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(50)]),
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
  
  
  onSubmitSignUp(){
    this.formSubmitted = true;
    this.signupForm.reset();
  }

}
