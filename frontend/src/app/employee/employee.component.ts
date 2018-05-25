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
  project:any;
  applications=[];
  show="no";
  manager=[];
  statusForm : FormGroup=new FormGroup({
  to:new FormControl(null,Validators.required),
  statusDate :new FormControl(null, Validators.required),
  inTime:new FormControl(null, Validators.required),
  outTime:new FormControl(null, Validators.required),
  breakTime:new FormControl(null, Validators.required),
  type:new FormControl(null, Validators.required),
  projectName:new FormControl(),
  workTime:new FormControl(),
  status:new FormControl(),
  task:new FormControl(null, Validators.required),
  });
  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) {
    this.id= this.route.snapshot.params['id'];

    this._user.myLeave(this.id)
    .subscribe(
       data=>{
        this.applications=data['data'];    
      },
      error=>console.log(error)
    )
     this._user.getAssignedProject(this.id)
    .subscribe(
       data=>{   
         this.project=data;
      },
      error=>console.log(error)
    )
    this._user.showManager()
    .subscribe(
      data=>{
        this.manager=data['data']; 
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
    this._user.sendStatus(this.id,JSON.stringify(this.statusForm.value))
    .subscribe(
       data=>{   
        alert("Status Sent");
      },
      error=>console.log(error)
    )
  }
}
