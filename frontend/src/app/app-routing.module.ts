import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { EditComponent } from './edit/edit.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AssignEmployeeComponent } from './assign-employee/assign-employee.component';
import { LeaveComponent } from './leave/leave.component';
import {loggedIn } from './guards';
import {notloggedIn } from './guards';
import {adminGuard } from './guards';
import {employeeGuard } from './guards';
import {managerGuard } from './guards';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { MyStatusComponent } from './my-status/my-status.component';

const routes: Routes = [
  {
  path:'', 
  redirectTo:'login', 
  pathMatch:'full'
  },
  {
  path:'login',
  component:LoginComponent,
  canActivate: [notloggedIn]
   },
  {
  path:'register', 
  component:RegisterComponent,
  canActivate: [notloggedIn]
  },
 {
  path:'admin/:id',
  component: AdminComponent,
  canActivate: [loggedIn, adminGuard]
  },
   {
  path:'employee/:id',
  component: EmployeeComponent,
  canActivate: [loggedIn, employeeGuard]
  },
   {
  path:'manager/:id',
  component: ManagerComponent,
  canActivate: [loggedIn, managerGuard]
  },
  {
  path:'home',
  component: HomeComponent,
 
  },
    {
    path: 'edit/:id',
    component: EditComponent,
    data: { title: 'Edit' },
    canActivate: [loggedIn, adminGuard]
  },
  {
    path: 'addTask/:id',
    component: AddTaskComponent,
    canActivate: [loggedIn, managerGuard]
  },
  {
    path: 'assignEmployee/:id',
    component: AssignEmployeeComponent,
    canActivate: [loggedIn]
  },
    {
    path: 'leave/:id',
    component: LeaveComponent,
    canActivate: [loggedIn, employeeGuard]
  },
  {
    path: 'myStatus/:id',
    component: MyStatusComponent,
    canActivate: [loggedIn, employeeGuard]
  },
   {
    path: 'leaveApplication/:id',
    component: LeaveApplicationComponent,
    canActivate: [loggedIn, managerGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
