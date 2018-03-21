import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {MyApiService} from '../my-api.service';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.css']
})
export class PictureDetailComponent implements OnInit {

  baseUrl: string;
  picture: any= {};
  color: string;
  hexacode: string;

  constructor(private activatedRoute: ActivatedRoute, private myApiService: MyApiService) {
    this.color = this.activatedRoute.snapshot.params['color'];
   }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getPictureDetail();
    this.getHexacode();
  }

  getPictureDetail() {
    this.myApiService.getPicture(this.activatedRoute.snapshot.params['id']).subscribe(response => {
      this.picture = response.json().data;
    });
  }

  getHexacode() {
    this.myApiService.getHexacodeColor(this.color).subscribe(response => {
      this.hexacode = response.json().hexacode;
    });
  }

}
