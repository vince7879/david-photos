import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MyApiService {

  http: any;
  baseUrl: string;
  authToken;
  public headers: Headers;

  constructor(http: Http) {
    this.http = http;
    //     connexion à distance sur zenbook en wifi
    // this.baseUrl = 'http://192.168.1.12:3200/';
    //     connexion à distance sur zenbook en wifi à Florimont
    // this.baseUrl = 'http://192.168.1.87:3200/';
    //     connexion locale
    this.baseUrl = 'http://127.0.0.1:3000/';
    this.authToken = null;
   }

   storeUserCredentials(token) {
    window.localStorage.setItem('david-photos', token);
    this.useCredentials(token);
  }

  useCredentials(token) {
    this.authToken = token;
  }

  loadUserCredentials() {
    const token = window.localStorage.getItem('david-photos');
    this.useCredentials(token);
  }

  destroyUserCredentials() {
    this.authToken = null;
    window.localStorage.setItem('david-photos', null);
    window.localStorage.clear();
  }

  getHeader() {
    const headers = new Headers();
    this.loadUserCredentials();
    headers.append('david-photos-token', this.authToken);
    const options = new RequestOptions({headers: headers});
    return options;
  }

  getBaseUrl() {
      return this.baseUrl;
  }

  getColorsInfos(): Observable <Response> {
      return this.http.get(this.baseUrl + 'colors').map(res => res.json());
  }

  getColorsMenu(color): Observable <Response> {
      return this.http.get(this.baseUrl + 'colors/menu?color=' + color);
  }

  getAllColors(): Observable <Response> {
      return this.http.get(this.baseUrl + 'colors/');
  }

  getHexacodeColor(color): Observable <Response> {
      return this.http.get(this.baseUrl + 'colors/hexacode?color=' + color);
  }

  getPicturesByColor(color, page): Observable <Response> {
      return this.http.get(this.baseUrl + 'pictures/gallery?color=' + color + '&page=' + page);
  }

  getPicture(id): Observable <Response> {
      return this.http.get(this.baseUrl + 'pictures/' + id, this.getHeader());
  }

  getPictureIdByColorAndRank(color, rank): Observable <Response> {
      return this.http.get(this.baseUrl + 'pictures/details?color=' + color + '&rank=' + rank);
  }

  getPicNbByColor(color): Observable <Response> {
    return this.http.get(this.baseUrl + 'pictures/rank?color=' + color);
}

  PicturesToEdit(color): Observable <Response> {
      return this.http.get(this.baseUrl + 'pictures/edit?color=' + color, this.getHeader());
  }

  getRecentPic(): Observable <Response> {
      return this.http.get(this.baseUrl + 'pictures/recent');
  }

  setNewOrder(pictures) {
    return this.http.post(this.baseUrl + 'pictures/editorder', {pix: pictures}, this.getHeader()).map(res => res.json());
  }

  modifyPictureDetails(details) {
    return this.http.post(this.baseUrl + 'pictures/editdetails', details, this.getHeader())
      .map((res: Response) => res.json());
  }

  removePicture(details) {
    return this.http.post(this.baseUrl + 'pictures/remove', details, this.getHeader())
      .map((res: Response) => res.json());
  }

}
