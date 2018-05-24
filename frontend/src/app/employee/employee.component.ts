import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  id:any;
  project=[{}];
  projectDetails=[{}];
  applications=[];
  show="no";
  statusForm : FormGroup=new FormGroup({
  to:new FormControl(null,Validators.required),
  statusDate :new FormControl(null, Validators.required),
  inTime:new FormControl(null, Validators.required),
  outTime:new FormControl(null, Validators.required),
  breakTime:new FormControl(null, Validators.required),
  projectName:new FormControl(null, Validators.required),
  workTime:new FormControl(null, Validators.required),
  status:new FormControl(null, Validators.required),
  task:new FormControl(null, Validators.required),
  });
  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) {
    this.id= this.route.snapshot.params['id'];
    this._user.getAssignedProject(this.id)
    debugger
    .subscribe(
      res=> {
        console.log("hi"+data)  
        console.log(this.project);},
      error=>console.log(error)
    )
    this._user.myLeave(this.id)
    .subscribe(
       data=>{
        this.applications=data['data'];    
      },
      error=>console.log(error)
    )
  }

  ngOnInit() {  
  }
  logout(){
    this._user.logout()
    .subscribe(
      data=>this.router.navigate(['/login']),
      error=>console.error(error)
    )
  }
  status(){
    console.log(JSON.stringify(this.statusForm.value))
  }
}
