import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userList: User[] = [
    { username:'preveen', firstName: 'Preveen', lastName: 'Raj', role: 'Admin'},
    { username:'techrush', firstName: 'Tech', lastName: 'Rush', role: 'Customer'}
  ];

  constructor() { }
  
  
  addUser(newUser:User){
    this.userList.push(newUser);
  }
  
  getUser(username:string){
    return this.userList.find(user => user.username === username );
  }
}


