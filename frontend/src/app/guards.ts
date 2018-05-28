
import { UserService } from './user.service';
import { RouterModule, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,ActivatedRoute } from "@angular/router";

@Injectable()
export class loggedIn implements CanActivate { 
  constructor(private userService: UserService,private _router:Router) {}; 

  canActivate() {
    if (sessionStorage.getItem('login')=='true') { 
      return true;
    } else {
      window.alert("please login first"); 
      this._router.navigate(['./login'])
      return false;
    }
  }
}
@Injectable()
export class notloggedIn implements CanActivate { 
     public href: string = "";
  constructor(private _user: UserService,private _router:Router) {}; 

  canActivate() {
    if (sessionStorage.getItem('login')=='true') {
      window.alert("You are already logged In");
      this.href=sessionStorage.getItem('href');
      this._router.navigate(['./'+this.href]);
      return false; 
    } else {
      return true;
    }
  }
}
@Injectable()
export class adminGuard implements CanActivate { 
     public href: string = "";
     public id:any;
  constructor(private _user: UserService,private _router:Router, private route :ActivatedRoute) {}; 

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
var re = '/';
this.id = state.url.split(re);
    if ((sessionStorage.getItem('user')=='admin')
        &&(sessionStorage.getItem('id')==this.id[2])) {
      return true;
    } else {
      window.alert("You cant access this page");
      this.href=sessionStorage.getItem('href');
      this._router.navigate(['./'+this.href]);
      return false; 
    }
  }
}
@Injectable()
export class employeeGuard implements CanActivate { 
     public href: string = "";
     public id:any;
  constructor(private _user: UserService,private _router:Router, private route :ActivatedRoute) {}; 

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
var re = '/';
this.id = state.url.split(re);
    if ((sessionStorage.getItem('user')=='employee')
        &&(sessionStorage.getItem('id')==this.id[2])) {
      return true;
    } else {
      window.alert("You cant access this page");
      this.href=sessionStorage.getItem('href');
      this._router.navigate(['./'+this.href]);
      return false; 
    }
  }
}
@Injectable()
export class managerGuard implements CanActivate { 
     public href: string = "";
     public id:any;
  constructor(private _user: UserService,private _router:Router, private route :ActivatedRoute) {}; 

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
var re = '/';
this.id = state.url.split(re);
    if ((sessionStorage.getItem('user')=='manager')
        &&(sessionStorage.getItem('id')==this.id[2])) {
      return true;
    } else {
      window.alert("You cant access this page");
      this.href=sessionStorage.getItem('href');
      this._router.navigate(['./'+this.href]);
      return false; 
    }
  }
}