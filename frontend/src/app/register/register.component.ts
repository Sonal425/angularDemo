import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder, FormArray} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  show="no";
  skills=[{skills:"angular"},{skills:"nodejs"},{skills:"mongodb"},{skills:"html"},{skills:"java"}]
  registerForm:FormGroup = new FormGroup({
  
  })

  constructor(private _router:Router, private _userService:UserService,private fb: FormBuilder) {  
   // this._userService.validReg()
   //  .subscribe(

   //    data=>{if(data=="not"){
   //      debugger
   //      this._router.navigate(['/login']);
   //    }},
   //    error=>console.log(error)
   //    )
 }
 
  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
      alert('Invalid Form'); return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
     data=>{ this._router.navigate(['/login']);},
      error=>console.error(error)
    )
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.email,Validators.required]),
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
      cpass:new FormControl(null,Validators.required),
      type: new FormControl(null,Validators.required),
      skills: this.fb.array([]),
    });
  }

  onChange(skills:string, isChecked: boolean) {
    const skillFormArray = <FormArray>this.registerForm.controls.skills;
    if(isChecked) {
      skillFormArray.push(new FormControl(skills));
    }
    else {
      let index = skillFormArray.controls.findIndex(x => x.value == skills)
      skillFormArray.removeAt(index);
    }
  }
}
