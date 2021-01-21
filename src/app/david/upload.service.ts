import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { MyApiService } from "../my-api.service";

@Injectable()
export class UploadService {
  constructor(private http: HttpClient, private myApiService: MyApiService) {}

  sendPicture(file: FormData): Observable<any> {
    return this.http.post(
      this.myApiService.baseUrl + "pictures/",
      file,
      this.myApiService.getHeader()
    );
  }
}
