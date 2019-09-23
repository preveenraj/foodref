import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // retain the url that is requested for authorization
    this.authService.redirectUrl = state.url;

    console.log('URL', state.url);
    
    return Observable.create((observer: Observer<boolean>) => {
      if (this.authService.loggedInUser) {
        console.log('Logged in');
        observer.next(true);
      } else {
        console.log('Not Logged in');
        this.router.navigate(['login'], { queryParams: { from: state.url.substr(1) } });
      }
    });
  }
}
