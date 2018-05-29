import { Component, OnInit } from '@angular/core';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})
export class LeaveApplicationComponent implements OnInit {
  id:any;
  applications:any;
  constructor(private route: ActivatedRoute,private _user:UserService, private router:Router) { 
   this.id= this.route.snapshot.params['id'];
    this._user.showLeaveApplications(this.id)
    .subscribe(
      data=>{
        this.applications=data;    
      },
      error=>console.log(error)
     )
  }
  ngOnInit() {
  }
  action(option:String,id:any){
     this._user.leaveAction(id,option)
    .subscribe(
      data=> window.location.reload(true),
      error=>console.log(error)
     )

  }
}
