import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm : FormGroup=new FormGroup({
  username:new FormControl(null,Validators.required),
  type:new FormControl(null, Validators.required)
  });
  id:any;
  user={};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private _user:UserService) { }

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
    this.getusers(this.id);
  }
  
  getusers(id) {
    this._user.getusers(id).subscribe(data => {
      this.user = data;
    });
  }

 editUser(id){
    if(!this.editForm.valid){
      alert('Invalid Form'); return;
    }
    if(confirm("Are you sure to update "+this.user['username'])) {
      this._user.editUser(id,JSON.stringify(this.editForm.value))
      .subscribe(
        data => {
          this.router.navigate(["/admin"]);},
          (err) => {
          console.log(err);
        }
      );
    }   
  }
}