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
  message: string;

  constructor(private myApiService: MyApiService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

  changePwd() {
    this.myApiService.changePwd(this.oldpwd, this.newpwd, this.confpwd).subscribe(response => {
      console.log(response);
      if (response.status === 'success') {
        this.message = response.message;
      } else {
        this.message = response.message;
      }
    });
  }

}
