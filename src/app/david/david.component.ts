import { Component, ElementRef, Input } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import {FormGroup, FormControl} from '@angular/forms';
import {FileValidatorDirective} from '../file-validator.directive';

import {UploadService} from './upload.service';
import {LoginService} from '../login/login.service';
import {MyApiService} from '../my-api.service';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

import { NavBackendComponent } from '../nav-backend/nav-backend.component';

@Component({
  selector: 'app-david',
  templateUrl: './david.component.html',
  styleUrls: ['./david.component.css']
})
export class DavidComponent {

  form: FormGroup;
  picture: File;
  picturePreview: string;
  formdata: FormData;
  // place: string;
  place = 'argentine';
  year: any = '2010';
  // month: string;
  month = 'mars';
  // color: string;
  color = 'grey';
  colors: any;
  message: string;
  fileContent: any;
  submitted = false;
  showLoader = false;

  constructor(private http: Http,
              private uploadService: UploadService,
              private loginService: LoginService,
              private myApiService: MyApiService,
              private ng2ImgMax: Ng2ImgMaxService,
              public sanitizer: DomSanitizer) {
                this.getColors();
  }

  getColors() {
    this.myApiService.getColorsInfos().subscribe(response => {
      // console.log(response);
      this.colors = response;
    });
  }

  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    const files: FileList = target.files;
    const image = files[0];
    this.ng2ImgMax.resizeImage(image, 500, 10000).subscribe(
      result => {
        this.picture = new File([result], result.name);
        this.getImagePreview(this.picture);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
    this.ng2ImgMax.compressImage(image, 0.9).subscribe(
      result => {
        this.picture = new File([result], result.name);
        const formData: FormData = new FormData();
        formData.append('uploadFile', this.picture, this.picture.name);
        this.formdata = formData;
      },
      error => {
        console.log(error);
      }
    );
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.picturePreview = reader.result;
    };
  }

  onSubmit() {
    // this.submitted = true;
  }

  // traiter le fait qu'on puisse resoumettre ac les donnees corrigées qd il ya une erreur
  // pour l'instant s'il ya eeruer puis coorection, c'ets l'erreur qui est soumis les 2 fois

  addPic() {
    this.showLoader = true;
    this.formdata.append('place', this.place);
    this.formdata.append('year', this.year);
    this.formdata.append('month', this.month);
    this.formdata.append('color', this.color);

    this.uploadService.sendPicture(this.formdata).subscribe(data => {
      console.log(data);
      if (data.status === 'success') {
        this.message = data.message;
        this.submitted = true;
      } else {
        this.message = data.message;
      }
    });
  }

}
