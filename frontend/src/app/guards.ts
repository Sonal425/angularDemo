
import { UserService } from './user.service';
import { RouterModule, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";

@Injectable()
export class loggedIn implements CanActivate { 
  constructor(private userService: UserService,private _router:Router) {}; 

  canActivate() {
  debugger
    if (this.userService.isLoggedIn) { 
      return true;
    } else {
      // window.alert("You don't have permission to view this page"); 
      this._router.navigate(['./login'])
      return false;
    }
  }
}

// export class notloggedIn implements CanActivate { 
//   constructor(private _user: UserService,private _router:Router) {}; 

//   canActivate() {
// debugger
//     if (this._user.isLoggedIn) { 

//        window.alert("You don't have permission to view this page"); 
//       this._router.navigate(['/home'])
//       return false; 
//     } else {
//       return true;
//     }
//   }
// }