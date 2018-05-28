import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import {loggedIn } from './guards';
import {notloggedIn } from './guards';
import {adminGuard } from './guards';
import {managerGuard } from './guards';
import {employeeGuard } from './guards';
import { EditComponent } from './edit/edit.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AssignEmployeeComponent } from './assign-employee/assign-employee.component';
import {FilterArray } from './filter';
import { LeaveComponent } from './leave/leave.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { MyStatusComponent } from './my-status/my-status.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    EmployeeComponent,
    ManagerComponent,
    EditComponent,
    AddTaskComponent,
    AssignEmployeeComponent,
    FilterArray,
    LeaveComponent,
    LeaveApplicationComponent,
    MyStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,  
  ],
  providers: [UserService, loggedIn, notloggedIn, adminGuard,employeeGuard, managerGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}