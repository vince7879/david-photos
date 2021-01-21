import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { MyApiService } from "../my-api.service";

@Injectable()
export class LoginService {
  baseUrl: string;

  constructor(private http: HttpClient, private myApiService: MyApiService) {
    this.baseUrl = this.myApiService.getBaseUrl();
  }

  signIn(login: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + "user/login", {
      login: login,
      pwd: password,
    });
  }

  IsLogged() {
    this.myApiService.loadUserCredentials();
    if (!this.myApiService.authToken || this.myApiService.authToken === "") {
      return false;
    } else {
      return true;
    }
  }
}
