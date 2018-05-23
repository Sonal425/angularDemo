import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup=new FormGroup({
  username:new FormControl(null,Validators.required),
  password:new FormControl(null, Validators.required)
  });

  constructor(private _router:Router, private _user:UserService) { }

  ngOnInit() {
  }

  login(){
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{  
      this._user.isLoggedIn=true;
      console.log(data);
      this._router.navigate(['/'+data["user"]['type']+"/"+data["user"]['_id']]);
    } ,
      error=>console.error(error)
    )
  } 
}
