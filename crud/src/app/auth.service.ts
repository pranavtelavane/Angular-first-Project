import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate = false;

  // login(user : string, password : string) : boolean{
  //   //debugger;
  //   if(user == 'admin' && password == 'admin'){
  //     this.isAuthenticate = true;
  //     return this.isAuthenticate;
  //   }

  // }
  login(user: string,password: string) {
    if (user == 'admin' && password == 'admin') {
      this.isAuthenticate = true;
      return this.isAuthenticate;
    }
    return false;
  }
  getToken()
  {
      return !!localStorage.getItem("user");
  }

  constructor() { }
}
