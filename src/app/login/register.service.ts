import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }
  
  getAllUser(){
    return this.http.get<User[]>('api/users')
  }
  readonly baseURL ='https://localhost:7292/api/users';
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
  insertUser(user : User):Observable<any>{
    return this.http.post(this.baseURL, JSON.stringify(user),this.headers);
  }

  getById(id:string){
    return this.http.get(this.baseURL+ `/${id}`);
  }
}
