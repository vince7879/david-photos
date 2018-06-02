import { Component, OnInit } from '@angular/core';
import { NavBackendComponent } from '../nav-backend/nav-backend.component';

import {MyApiService} from '../my-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  oldpwd: string;
  newpwd: string;
  confpwd: string;
  submitted = false;
  error = false;
  msgError: string;
  msgSuccess = '';
  // message: string;
  pwdChanged = false;

  constructor(private myApiService: MyApiService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

  changePwd() {
    this.myApiService.changePwd(this.oldpwd, this.newpwd, this.confpwd).subscribe(response => {
      // console.log(response);
      if (response.status === 'success') {
        this.error = false;
        this.msgSuccess = response.message;
        this.pwdChanged = true;
      } else {
        this.error = true;
        this.msgError = response.message;
        this.pwdChanged = false;
      }
    });
  }

}
