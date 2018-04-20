import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder, FormArray} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  filesToUpload: File;
  url="";
  skills=[{skills:"angular"},{skills:"nodejs"},{skills:"mongodb"},{skills:"html"},{skills:"java"}]
  addTaskForm : FormGroup;
  
  constructor(private router: Router, private _user:UserService,private http: HttpClient,private fb: FormBuilder) { }

  ngOnInit() {
    this.addTaskForm = this.fb.group({
      tech: this.fb.array([]),
      title:new FormControl(null,Validators.required),
      des:new FormControl(null, Validators.required),
      cname:new FormControl(null, Validators.required),
      type:new FormControl(null, Validators.required),
    });
  }

  addTask(){
    this._user.addTask(JSON.stringify(this.addTaskForm.value))
    .subscribe(
      data => {
        this.router.navigate(["/manager"]);},
        (err) => {
        console.log(err);
      }
    );
  }

  upload() {
    const formData: any = new FormData();
    const files: File = this.filesToUpload;
    formData.append("uploads[]", files[0], files[0]['name']);
    formData.append("form",JSON.stringify(this.addTaskForm.value));
    this.http.post('http://localhost:3000/upload', formData)
      .subscribe(files =>{
        this.router.navigate(['/manager'])
      } 
    )
  }

  onChange(skills:string, isChecked: boolean) {
    const techFormArray = <FormArray>this. addTaskForm.controls.tech;
    if(isChecked) {
      techFormArray.push(new FormControl(skills));
    } else {
      let index = techFormArray.controls.findIndex(x => x.value == skills)
      techFormArray.removeAt(index);
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]);
      reader.onload = (fileInput) => {
        this.url = reader.result;
      }
    }    
  }
}
