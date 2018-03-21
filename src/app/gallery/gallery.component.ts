import { Component, OnInit, DoCheck, ElementRef, Renderer2, ViewChild } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {MyApiService} from '../my-api.service';

import { PreviewDirective } from './preview.directive';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements DoCheck, OnInit {

  baseUrl: string;
  color: string;
  hexacode: string;
  oldColor: string;
  color_collection: any;
  picture_collection: any;
  pictures_count: number;
  page: number;
  oldPage: number;

  constructor(private activatedRoute: ActivatedRoute,
              private myApiService: MyApiService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.color = params.color;
      // console.log(this.color);
      this.page = params.page;
      // console.log(this.page);
    });
    this.getHexacode();
    this.getColorsMenu();
    this.getPicturesByColor();
  }

  ngDoCheck() {
    if (this.oldColor !== this.color) {
      this.getHexacode();
      this.getColorsMenu();
      this.getPicturesByColor();
    }
    if (this.oldPage !== this.page) {
      this.getPicturesByColor();
    }
  }

  getHexacode() {
    // console.log(this.color);
    this.myApiService.getHexacodeColor(this.color).subscribe(response => {
      this.hexacode = response.json().hexacode;
      // console.log(this.hexacode);
    });
  }

  getColorsMenu() {
    this.oldColor = this.color;
    this.myApiService.getColorsMenu(this.color).subscribe(response => {
      this.color_collection = response.json();
    });
  }

  getPicturesByColor() {
    this.oldPage = this.page;
    this.myApiService.getPicturesByColor(this.color, this.page).subscribe(response => {
      this.picture_collection = response.json().rows;
      this.pictures_count = response.json().count;
      // console.log(this.pictures_count);
    });
  }

}
