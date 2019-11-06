import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, enableProdMode } from '@angular/core';
import { User } from './user';
import { Observable, Observer, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  userUrl:string = environment.userUrl;
  
  authUrl:string = environment.authUrl;


  userList: User[] = [ ];


  
  // userList: User[] = [
  //   { username:'admin', firstName: 'Preveen', lastName: '(Admin)', password:'pwd', role: 'admin'},
  //   { username:'user', firstName: 'Tech', lastName: 'Rush', password:'pwd', role: 'user'}
  // ];

  constructor(private http: HttpClient) { }
  
  
  addUser(newUser:User):Observable<boolean>{
    // this.userList.push(newUser);
    return this.http.post<boolean>(this.userUrl,newUser);
  }

  userExists(username:string):boolean{
    return this.userList.some(user => user.username === username );
  }

  
  getUser(username:string){
    return this.userList.find(user => user.username === username );
  }

  isUserNameTaken(username:string){
   return of({ isLoginAvailable: !this.userList.some(user=> user.username == username) });
   
  }

  authenticate(username: string, password: string): Observable<any> {
  /*   return Observable.create((observer: Observer<any>) => { // temporary
      const usermatched = this.getUser(username);
      if(usermatched!=null){
      usermatched.accessToken = 'JWT-TOKEN';
      observer.next(usermatched);
    } else {
      observer.next(null);
    }  });  */
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<any>(this.authUrl,{headers});


      // if (username === 'preveen') {
      //   observer.next({ username,  firstName: 'Preveen', lastName: 'Raj', role: 'Admin', accessToken: 'JWT-TOKEN' });
      // } else if(username === 'techrush') {
      //   observer.next({ username,  firstName: 'Tech', lastName: 'Rush', role: 'Customer', accessToken: 'JWT-TOKEN' });
      // } else {
      //     observer.next(null);
      // }
      return null;
   
  }

}





