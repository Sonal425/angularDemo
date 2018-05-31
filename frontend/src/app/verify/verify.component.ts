import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  token:string;
  constructor(private route: ActivatedRoute,private _user:UserService, private _router:Router) { 
    this.token= this.route.snapshot.params['id'];
    this._user.verifyEmail(this.token)
    .subscribe(
     data=>this._router.navigate(['/login']),
      error=>{
        this._router.navigate(['/login'])
      }
    )
  
  }

  ngOnInit() {
  }


}
