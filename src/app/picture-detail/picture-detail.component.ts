import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {MyApiService} from '../my-api.service';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.css']
})
export class PictureDetailComponent implements OnInit, DoCheck {

  baseUrl: string;
  picture: any= {};
  color: string;
  hexacode: string;
  rank: number;
  oldRank: number;
  lastRank: number;
  picId: number;
  oldPicId: number;
  picNb: number;
  arrowColor = 'white';

  constructor(private activatedRoute: ActivatedRoute, private myApiService: MyApiService) {
    this.picId = this.activatedRoute.snapshot.params['id'];
    this.color = this.activatedRoute.snapshot.params['color'];
    if (this.color === 'white' || this.color === 'black-white') {
      this.arrowColor = 'black';
    }
   }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getPictureDetailById(this.picId);
    this.getPicNbByColor(this.color);
    this.getHexacode();
  }

  ngDoCheck() {
    if (this.oldPicId !== this.picId) {
      this.getPictureDetailById(this.picId);
    }
  }

  findNextPic() {
    this.rank = this.rank + 1;
    this.getPictureIdByColorAndRank(this.color, this.rank);
  }

  findPrevPic() {
    this.rank = this.rank - 1;
    this.getPictureIdByColorAndRank(this.color, this.rank);
  }

  getPictureDetailById(id) {
    this.oldPicId = id;
    this.myApiService.getPicture(id).subscribe(response => {
      this.picture = response.json().data;
      this.rank = this.picture.rank;
      this.oldRank = this.rank;
    });
  }

  getPictureIdByColorAndRank(color, rank) {
    this.oldPicId = this.picId;
    this.myApiService.getPictureIdByColorAndRank(color, rank).subscribe(response => {
      this.picId = response.json().data.id;
    });
  }

  getHexacode() {
    this.myApiService.getHexacodeColor(this.color).subscribe(response => {
      this.hexacode = response.json().hexacode;
    });
  }

  getPicNbByColor(color) {
    this.myApiService.getPicNbByColor(color).subscribe(response => {
      this.picNb = response.json().data;
    });
  }

}
