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
  project:Array<any>=[{}];
  id:string;
  status:any;
  notifications:any;
  unreadNotifications:any;
  constructor(private route: ActivatedRoute,private _user:UserService, private _router:Router) {
    this.id= this.route.snapshot.params['id'];
    this._user.showAllProjects()
    .subscribe(
      data=> this.project=data['data'],
      error=>console.log(error)
    ) 
    this._user.allStatus(this.id)
    .subscribe(
       data=>{
        this.status=data;
      },
      error=>console.log(error)
    )
    this.loadNotifications();
    this.countUnreadNotifications();
  }

  ngOnInit() {}

  logout(){
    sessionStorage.setItem('login', 'false');
    this._user.logout()
    .subscribe(
      data=>this._router.navigate(['/login']),
      error=>console.error(error)
    )
  }
  read(status, id){
    if(status=="unread"){
      this._user.markNotificationRead(id)
    .subscribe(
        error=>console.log(error)
      )
      this.loadNotifications();
      this.countUnreadNotifications();
    }
  }
  readAll(){
      this._user.markAllNotificationsRead(this.id)
    .subscribe(
        error=>console.log(error)
      )
    this.loadNotifications();
    this.countUnreadNotifications();  
  }
  loadNotifications(){
     this._user.getNotifications(this.id)
    .subscribe(
       data=>{
        this.notifications=data;
        console.log(this.notifications);
      },
      error=>console.log(error)
    )
  }
  countUnreadNotifications(){
    this._user.countUnreadNotifications(this.id)
    .subscribe(
      data=>{this.unreadNotifications=data;
        console.log(this.unreadNotifications)},
      error=>console.log(error)
      )
  }
}
