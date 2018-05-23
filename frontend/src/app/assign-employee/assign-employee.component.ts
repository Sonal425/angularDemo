import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FilterArray} from '../filter';
import { Pipe, PipeTransform} from '@angular/core';
@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.scss'],
  
})
export class AssignEmployeeComponent implements OnInit {
  users=[{}];
  name=[];
  email=[];
  projectid:any;
  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) {
    this._user.showEmployee()
    .subscribe(
      data=>{
        console.log(data); 
        this.users=data['data'];
        var count= Object.keys(this.users).length;
        for(var i=0;i<this.users.length;i++){
          this.name.push(this.users[i]['name']); 
          this.email.push(this.users[i]['email']); 
        }
      },
      error=>console.log(error)
    )
  }
  ngOnInit() {
    this.projectid= this.route.snapshot.params['id'];
  } 
  assign(employeeid, name){
    console.log(this.projectid+" "+employeeid)
        if(confirm("Assign this project to "+name)) {
      this._user.assign(this.projectid,employeeid)
      .subscribe(
        data => {
          this.router.navigate(["/manager"]);},
          (err) => {
          console.log(err);
        }
      );
    }  

  }
}
