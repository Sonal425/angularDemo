import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
 today= new Date().toLocaleDateString();

  constructor() { 
   }

  ngOnInit() {
  }
  checkDate(fromDate,toDate){

  console.log(fromDate.toDateString());
   console.log(this.today)
   if(this.today>fromDate){
    console.log("invalid");
   }
   else
    console.log("valid");

}
}
