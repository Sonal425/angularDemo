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
  public href:string="";
  loginForm : FormGroup=new FormGroup({
  username:new FormControl(null,Validators.required),
  password:new FormControl(null, Validators.required)
  });

  constructor(private _router:Router, private _user:UserService) {
   sessionStorage.setItem('login', 'false'); }

  ngOnInit() {
  }

  login(){
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{  
      this.href = '/'+data["user"]['type']+"/"+data["user"]['_id'];
      sessionStorage.setItem('href',this.href);
      sessionStorage.setItem('login', 'true');
      sessionStorage.setItem('user',data["user"]['type']);
      sessionStorage.setItem('id',data["user"]['_id'])
      this._router.navigate(['/'+data["user"]['type']+"/"+data["user"]['_id']]);
    } ,
      error=>console.error(error)
    )
  } 
}
