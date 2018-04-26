import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import {MyApiService} from '../my-api.service';

@Component({
  selector: 'app-nav-backend',
  templateUrl: './nav-backend.component.html',
  styleUrls: ['./nav-backend.component.css']
})
export class NavBackendComponent implements OnInit {

  constructor(private myApiService: MyApiService) { }

  ngOnInit() {
  }

  logout() {
    this.myApiService.logout();
  }

}
