import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {MyApiService} from '../my-api.service';

@Injectable()
export class UploadService {

  http: any;

  constructor(http: Http, private myApiService: MyApiService) {
    this.http = http;
   }

   sendPicture(file: FormData) {
    return this.http.post(this.myApiService.baseUrl + 'pictures/', file, this.myApiService.getHeader())
      .map((res: Response) => res.json());
  }

}
