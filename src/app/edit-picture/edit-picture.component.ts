import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {MyApiService} from '../my-api.service';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.css']
})
export class EditPictureComponent implements OnInit {

  baseUrl: string;
  picture: any= {};
  place: string;
  year: any;
  month: string;
  oldColor: string;
  newColor: string;
  colors: any;
  details: any= {};
  message: string;

  constructor(private activatedRoute: ActivatedRoute, private myApiService: MyApiService) {
    this.oldColor = this.activatedRoute.snapshot.params['color'];
   }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getPictureDetail();
    this.getColors();
  }

  getPictureDetail() {
    this.myApiService.getPicture(this.activatedRoute.snapshot.params['id']).subscribe(response => {
      this.picture = response.json().data;
      // console.log(this.picture);
      this.place = this.picture.place;
      this.year = this.picture.year;
      this.month = this.picture.month;
      this.newColor = this.picture.color_name;
    });
  }

  getColors() {
    this.myApiService.getColorsInfos().subscribe(response => {
      // console.log(response);
      this.colors = response;
    });
  }

  modifyPic() {
    this.details = {
      'id': this.activatedRoute.snapshot.params['id'],
      'place': this.place,
      'year': this.year,
      'month': this.month,
      'newColor': this.newColor,
      'oldColor': this.oldColor
    };
    // console.log(this.formdata);
    this.myApiService.modifyPictureDetails(this.details).subscribe(data => {
      console.log(data);
      this.message = data.message;
    });
  }

  removePic() {
    this.details = {
      'id': this.activatedRoute.snapshot.params['id'],
      'oldColor': this.oldColor
    };
    this.myApiService.removePicture(this.details).subscribe(data => {
      this.message = data.message;
    });
  }

}
