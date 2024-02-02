import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7029/api/User/"
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}AddUser`, userObj)
  }

  /*
  logIn(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate`, loginObj)
  }
  */

  logIn(loginObj:any): Observable<User>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(`${this.baseUrl}Authenticate`, loginObj)
  }


}
