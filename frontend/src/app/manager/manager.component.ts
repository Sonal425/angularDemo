import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  project=[{}];
  id:any;
  constructor(private route: ActivatedRoute,private _user:UserService, private _router:Router) {
    this.id= this.route.snapshot.params['id'];
    this._user.showProject()
    .subscribe(
      data=> this.project=data['data'],
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

}
