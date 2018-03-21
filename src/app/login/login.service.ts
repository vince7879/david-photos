import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Rx';

import {MyApiService} from '../my-api.service';

@Injectable()
export class LoginService {

  // authToken;
  // public headers: Headers;
  baseUrl: string;

  constructor(private http: Http, private myApiService: MyApiService) {
    this.baseUrl = this.myApiService.getBaseUrl();
   }

  signIn(login, password): Observable<Response> {
    return  this.http.post(this.baseUrl + 'user/login', {login: login, pwd: password});
  }

  IsLogged() {
    this.myApiService.loadUserCredentials();
    if (!this.myApiService.authToken || this.myApiService.authToken === '') {
      return false;
    } else {
      return true;
    }
  }

}
