import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  id:any;
  project=[{}];
  projectDetails=[{}];
  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) {
    this.id= this.route.snapshot.params['id'];
    this._user.getAssignedProject(this.id)
    .subscribe(
      data=> {
        console.log(data)
        // this.project=data;
        console.log(this.project);},
      error=>console.log(error)
    )
    }  
  ngOnInit() {
   
  }
}
