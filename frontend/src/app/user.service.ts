import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
@Injectable()
export class UserService {
  public isLoggedIn:boolean;
  isloggedIn=false;

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
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
   showUser(){
        // this.isLoggedIn=true;
    return this._http.get('http://127.0.0.1:3000/userApi/admin',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  validReg(){
    return this._http.get('http://127.0.0.1:3000/userApi/register',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  logout(){
    return this._http.get('http://127.0.0.1:3000/userApi/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  delete(id:any){
    let params = new HttpParams();
       params = params.append('id', id);
    return this._http.delete('http://127.0.0.1:3000/userApi/admin',{params})
  }
  edit(id:any, body:any){
    return this._http.put('http://127.0.0.1:3000/userApi/edit/'+id, body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  addTask(body:any){
      return this._http.post('http://127.0.0.1:3000/userApi/addTask',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getuser(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/getuser/'+id,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  showProject(){
    return this._http.get('http://127.0.0.1:3000/userApi/showProject',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  showEmployee(){
    return this._http.get('http://127.0.0.1:3000/userApi/showEmployee',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  assign(projectid:any,employeeid:any){
     return this._http.post('http://127.0.0.1:3000/userApi/assignProject',{
      params:{employeeid:employeeid, projectid:projectid},
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getAssignedProject(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/getAssignedProject/'+id,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  showAssignedProject(id:any){
    return this._http.get('http://127.0.0.1:3000/userApi/showAssignedProject',{
      params:{ projectid : id},
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}
