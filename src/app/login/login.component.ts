import { Component, OnInit, Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { LoginService } from './login.service';
import {MyApiService} from '../my-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: string;
  public pwd: string;
  public msgError: string;

  constructor(private myApiService: MyApiService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  submit() {
    this.loginService.signIn(this.login, this.pwd).subscribe(res => {
      console.log(res.json());
      if (res.json().status === 'success') {
        let token = res.json().token;
        this.myApiService.storeUserCredentials(token);
        this.router.navigate(['david']);
      } else {
        this.msgError = res.json().message;
      }
    });

  }
}
