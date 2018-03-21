import { Component, ElementRef, Input } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import {FormGroup, FormControl} from '@angular/forms';
import {FileValidatorDirective} from '../file-validator.directive';

import {UploadService} from './upload.service';
import {LoginService} from '../login/login.service';
import {MyApiService} from '../my-api.service';

@Component({
  selector: 'app-david',
  templateUrl: './david.component.html',
  styleUrls: ['./david.component.css']
})
export class DavidComponent {

  picture: File;
  formdata: FormData;
  place: string = 'bolivie';
  year: any = '2012';
  month: string = 'janvier';
  color: string = 'black-white';
  colors: any;
  message: string;
  fileContent: any;

  constructor(private http: Http,
              private uploadService: UploadService,
              private loginService: LoginService,
              private myApiService: MyApiService) {
                this.getColors();
  }

  getColors() {
    this.myApiService.getColorsInfos().subscribe(response => {
      // console.log(response);
      this.colors = response;
    });
  }

  onChange(event: EventTarget) {
      let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      // console.log(eventObj);
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      // console.log(target);
      let files: FileList = target.files;
      // console.log(files);
      this.picture = files[0];
      // console.log(this.picture);
      let formData: FormData = new FormData();
      formData.append('uploadFile', this.picture, this.picture.name);
      this.formdata = formData;
  }

  // traiter le fait qu'on puisse resoumettre ac les donnees corrigées qd il ya une erreur
  // pour l'instant s'il ya eeruer puis coorection, c'ets l'erreur qui est soumis les 2 fois

  addPic() {
    this.formdata.append('place', this.place);
    this.formdata.append('year', this.year);
    this.formdata.append('month', this.month);
    this.formdata.append('color', this.color);
    
    this.uploadService.sendPicture(this.formdata).subscribe(data => {
      // console.log(data);
      if (data.status === 'success') {
        this.message = data.message;
      } else {
        this.message = data.message;
      }
    });
  }

}
