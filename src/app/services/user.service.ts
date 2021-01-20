import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  signup(user){
    return this.http.post('/server/api/v1/signup', user, httpOption);
  }

  // tslint:disable-next-line:typedef
  login(userDTO): Observable<any>{
    return this.http.post<boolean>('/server/api/v1/login', userDTO, httpOption);
  }
}
