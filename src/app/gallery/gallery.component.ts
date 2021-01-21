import { Component, OnInit, DoCheck } from "@angular/core";

import { ActivatedRoute, Params } from "@angular/router";
import { MyApiService } from "../my-api.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private myApiService: MyApiService
  ) {}

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.color = params.color;
      this.page = params.page;
    });
    this.getColorHexacode();
    this.getSidebarColors();
    this.getPicturesByColor();
  }

  ngDoCheck() {
    if (this.oldColor !== this.color) {
      this.getColorHexacode();
      this.getSidebarColors();
      this.getPicturesByColor();
    }
    if (this.oldPage !== this.page) {
      this.getPicturesByColor();
    }
  }

  getColorHexacode() {
    this.myApiService.getColorInfo(this.color).subscribe((info) => {
      this.hexacode = info.hexacode;
    });
  }

  getSidebarColors() {
    this.oldColor = this.color;
    this.myApiService.getOtherColors(this.color).subscribe((colors) => {
      this.color_collection = colors;
    });
  }

  getPicturesByColor() {
    this.oldPage = this.page;
    this.myApiService
      .getPicturesByColor(this.color, this.page)
      .subscribe((response) => {
        this.picture_collection = response.rows;
        this.pictures_count = response.count;
      });
  }
}
