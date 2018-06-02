import { Component, OnInit } from '@angular/core';

import {MyApiService} from '../my-api.service';


@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  baseUrl: string;
  color_collection: any;
  picture_collection: any;

  constructor(private myApiService: MyApiService) { }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getAllColorsMenu();
    this.getRecentPictures();
  }

  getAllColorsMenu() {
    this.myApiService.getAllColors().subscribe(response => {
      this.color_collection = response.json();
    });
  }

  getRecentPictures() {
    this.myApiService.getRecentPic().subscribe(response => {
      this.picture_collection = response.json().data;
      // console.log(this.picture_collection);
    });
  }

}
