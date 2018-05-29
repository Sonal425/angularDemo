import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FilterArray} from '../filter';
// import { Pipe, PipeTransform} from '@angular/core';
@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.scss'],
  
})
export class AssignEmployeeComponent implements OnInit {
  intial="yes";
  users=[{}];
  name=[];
  email=[];
  projectid:any;
  searchText:string;
  filterValue:any;
  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) {
    this._user.showEmployees()
    .subscribe(
      data=>{
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
  assignProject(employeeid, name){
    if(confirm("Assign this project to "+name)) {
      this._user.assignProject(this.projectid,employeeid)
      .subscribe(
        data => {
          this.router.navigate(["/manager"]);},
          (err) => {
          console.log(err);
        }
      );
    }  
  }

  search(){
    this.intial="no";
    this._user.search(this.searchText)
      .subscribe(
        data => {
          this.filterValue=data;
          if(this.filterValue.length==0){
            alert("no matching result");
            this.intial='yes';
          }
          },
          (err) => {
          console.log(err);
        }
      );
    }  
}
