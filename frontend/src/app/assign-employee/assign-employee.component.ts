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
  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]
  constructor(private route: ActivatedRoute, private _user:UserService, private _router:Router) {
      this._user.showEmployee()
    .subscribe(

      data=>{
        debugger
      console.log(data); this.users=data['data'];},
      error=>console.log(error)
      )
   }
  ngOnInit() {
  }

}
