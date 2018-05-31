import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  manager:Array<any>=[];
  employeeid:string;
  leaveForm : FormGroup=new FormGroup({
  leaveType:new FormControl(null,Validators.required),
  fromDate :new FormControl(null, Validators.required),
  fromSession:new FormControl(null, Validators.required),
  toDate:new FormControl(null, Validators.required),
  tillSession:new FormControl(null, Validators.required),
  applyTo:new FormControl(null, Validators.required),
  reason:new FormControl(null, Validators.required),
  });

  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) { 
    this._user.showManagers()
    .subscribe(
      data=>{
        this.manager=data['data'];
      },
      error=>console.log(error)
    )
  }
   

  ngOnInit() {
    this.employeeid= this.route.snapshot.params['id'];
  }
  // checkDate(fromDate,toDate){

  // console.log(fromDate.toDateString());
  //  console.log(this.today)
  //  if(this.today>fromDate){
  //   console.log("invalid");
  //  }
  //  else
  //   console.log("valid");
  // }
  applyleave(){
    console.log(JSON.stringify(this.leaveForm.value))
    debugger
    if(!this.leaveForm.valid)
    alert("All fields are required");
  else
    this._user.applyleave(this.employeeid,JSON.stringify(this.leaveForm.value))
  .subscribe(
    data=>this.router.navigate(['/employee/'+this.employeeid]))
  }
}
