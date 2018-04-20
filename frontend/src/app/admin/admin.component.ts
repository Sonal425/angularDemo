import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users:any;
  show = false;
   editForm : FormGroup=new FormGroup({
  username:new FormControl(null,Validators.required),
  type:new FormControl(null, Validators.required)
  });

  constructor(private _user:UserService, private _router:Router,private location: Location) { 
    this._user.isLoggedIn=true;
    this._user.showUser()
    .subscribe(
      data=> this.users=data['data'],
      error=>console.log(error)
    )
  }
  ngOnInit() {}
  
  logout(){
    this._user.logout()
    .subscribe(
      data=>this._router.navigate(['/login']),
      error=>console.error(error)
    )
  }
  delete(id, name) {
     if(confirm("Are you sure to delete "+name)) {
      this._user.delete(id)
      .subscribe(
        data => {
        window.location.reload(true);},
        (err) => {
          console.log(err);
        }
      );
    }
  }
}