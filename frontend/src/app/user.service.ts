import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
@Injectable()
export class UserService {
  public isLoggedIn=false;

  constructor(private _http:HttpClient) { }
  register(body:any){
    return this._http.post('http://127.0.0.1:3000/userApi/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    // this.isLoggedIn=true;
    return this._http.post('http://127.0.0.1:3000/userApi/login',body,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  showAllUsers(){
        // this.isLoggedIn=true;
    return this._http.get('http://127.0.0.1:3000/userApi/admin',{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  validReg(){
    return this._http.get('http://127.0.0.1:3000/userApi/register',{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  logout(){
    return this._http.get('http://127.0.0.1:3000/userApi/logout',{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  deleteUser(id:any){
    let params = new HttpParams();
       params = params.append('id', id);
    return this._http.delete('http://127.0.0.1:3000/userApi/admin',{params})
  }
  editUser(id:any, body:any){
    return this._http.put('http://127.0.0.1:3000/userApi/editUser/'+id, body,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  addTask(body:any){
      return this._http.post('http://127.0.0.1:3000/userApi/addTask',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getusers(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/getusers/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  showAllProjects(){
    return this._http.get('http://127.0.0.1:3000/userApi/showAllProjects',{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  showEmployees(){
    return this._http.get('http://127.0.0.1:3000/userApi/showEmployees',{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
   showManagers(){
    return this._http.get('http://127.0.0.1:3000/userApi/showManagers',{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  assignProject(projectid:any,employeeid:any){
     return this._http.post('http://127.0.0.1:3000/userApi/assignProject',{
      params:{employeeid:employeeid, projectid:projectid},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getAssignedProject(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/getAssignedProject/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  applyleave(id:any,body:any){
     return this._http.post('http://127.0.0.1:3000/userApi/applyleave',body,{
      params:{ employeeid : id, status: "unread"},
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  showLeaveApplications(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/showLeaveApplications/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  leaveAction(id:any,option:String){
     return this._http.put('http://127.0.0.1:3000/userApi/leaveAction/'+id,{
      params:{status:option},
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  myLeave(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/myLeave/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  myStatus(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/myStatus/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  allStatus(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/allStatus/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  sendStatus(id:any,body:any){
     return this._http.post('http://127.0.0.1:3000/userApi/sendStatus',body,{
      params:{ employeeid : id},
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  search(searchKeyword:any){
    return this._http.get('http://127.0.0.1:3000/userApi/search',{
      params:{keyword:searchKeyword},
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getNotifications(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/getNotifications/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  markNotificationRead(id){
    return this._http.put('http://127.0.0.1:3000/userApi/markNotificationRead/'+id,{
      params:{status:"read"},
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  markAllNotificationsRead(id){
    return this._http.put('http://127.0.0.1:3000/userApi/markAllNotificationsRead/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  countUnreadNotifications(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/countUnreadNotifications/'+id,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  verifyEmail(token:any){
    return this._http.get('http://127.0.0.1:3000/userApi/verifyEmail/'+token,{
      observe:'body',
      // withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
}
