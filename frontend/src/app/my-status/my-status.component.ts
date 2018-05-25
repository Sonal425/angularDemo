import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-status',
  templateUrl: './my-status.component.html',
  styleUrls: ['./my-status.component.scss']
})
export class MyStatusComponent implements OnInit {
id:any;
status=[{}];
  constructor(private route: ActivatedRoute, private _user:UserService, private router:Router) {
    this.id= this.route.snapshot.params['id'];
    this._user.myStatus(this.id)
    .subscribe(
       data=>{
        this.status=data['data'];   
      },
      error=>console.log(error)
    )
 }

  ngOnInit() {
  }

}
