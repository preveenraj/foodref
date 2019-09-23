import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLoginValid:boolean=true;
  authSource:string;
  

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.authSource = params['from'];
    });
  }


  
  onSubmit(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    if (username === 'yoyoboy') { // temporary to show the invalid user login
      this.isLoginValid = false;
    } else {
      this.authService.login(username, password);
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

}
