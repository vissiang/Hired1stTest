import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'https://localhost:7029/api/';
  private baseUrl:string = "https://localhost:7029/api/Product/"

  constructor(private http: HttpClient) { }

  // User
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'User/GetUsers');
  }

  getUser(userId: string): Observable<User>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<User>(this.apiUrl + 'user/GetUserById/' + userId, httpOptions);
  }

  addUser(user: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'user/AddUser', user, httpOptions);
  }

  updateUser(user: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'user/UpdateUser', user, httpOptions);
  }

  deleteUser(userId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'user/DeleteUser/' + userId, httpOptions);
  }

  // Product
  getProductList(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'product/GetProductByUserId/' + userId);
  }

  getProduct(productId: string): Observable<Product>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<Product>(this.apiUrl + 'product/GetProductById/' + productId, httpOptions);
  }

  /*
  addProduct(prod: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'product/AddProduct', prod, httpOptions);
  }
  */

  addProduct(prodObj:any){
    return this.http.post<any>(`${this.baseUrl}AddProduct`, prodObj)
  }

  updateProduct(prod: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'product/UpdateProduct/', prod, httpOptions);
  }

  deleteProduct(prodId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'product/DeleteProduct/' + prodId, httpOptions);
  }


}
