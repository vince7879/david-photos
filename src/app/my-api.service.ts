import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class MyApiService {
  //     connexion locale
  // baseUrl = "http://127.0.0.1:3000/";
  //     connexion david server
  baseUrl = "https://api.david-photo.org/";
  authToken = null;

  constructor(private http: HttpClient) {}

  storeUserCredentials(token: string) {
    window.localStorage.setItem("david-photos", token);
    this.setCredentials(token);
  }

  setCredentials(token: string) {
    this.authToken = token;
  }

  loadUserCredentials() {
    const token = window.localStorage.getItem("david-photos");
    this.setCredentials(token);
  }

  destroyUserCredentials() {
    this.authToken = null;
    window.localStorage.setItem("david-photos", null);
    window.localStorage.clear();
  }

  logout() {
    this.destroyUserCredentials();
  }

  getHeader() {
    this.loadUserCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        "david-photos-token": this.authToken,
      }),
    };
    return httpOptions;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getColorsInfos(): Observable<any> {
    return this.http.get(this.baseUrl + "colors");
  }

  getOtherColors(color: string): Observable<any> {
    return this.http.get(this.baseUrl + "colors/menu?color=" + color);
  }

  getAllColors(): Observable<any> {
    return this.http.get(this.baseUrl + "colors/");
  }

  getColorInfo(color: string): Observable<any> {
    return this.http.get(this.baseUrl + "colors/hexacode?color=" + color);
  }

  getPicturesByColor(color: string, page: number): Observable<any> {
    return this.http.get(
      this.baseUrl + "pictures/gallery?color=" + color + "&page=" + page
    );
  }

  getPictureInfo(id: number): Observable<any> {
    return this.http.get(this.baseUrl + "pictures/" + id);
  }

  getPictureIdByColorAndRank(color: string, rank: number): Observable<any> {
    return this.http.get(
      this.baseUrl + "pictures/details?color=" + color + "&rank=" + rank
    );
  }

  getPicturesCountByColor(color: string): Observable<any> {
    return this.http.get(this.baseUrl + "pictures/rank?color=" + color);
  }

  PicturesToEdit(color: string): Observable<any> {
    return this.http.get(
      this.baseUrl + "pictures/edit?color=" + color,
      this.getHeader()
    );
  }

  getRecentPic(): Observable<any> {
    return this.http.get(this.baseUrl + "pictures/recent");
  }

  setNewOrder(pictures): Observable<any> {
    return this.http.post(
      this.baseUrl + "pictures/editorder",
      { pix: pictures },
      this.getHeader()
    );
  }

  modifyPictureDetails(details): Observable<any> {
    return this.http.post(
      this.baseUrl + "pictures/editdetails",
      details,
      this.getHeader()
    );
  }

  removePicture(details): Observable<any> {
    return this.http.post(
      this.baseUrl + "pictures/remove",
      details,
      this.getHeader()
    );
  }

  changePwd(oldpwd, newpwd, confpwd): Observable<any> {
    return this.http.post(
      this.baseUrl + "user/changePwd",
      { oldpwd: oldpwd, newpwd: newpwd, confpwd: confpwd },
      this.getHeader()
    );
  }
}
