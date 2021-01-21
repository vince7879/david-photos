import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UploadService } from "./upload.service";
import { MyApiService } from "../my-api.service";
import { Ng2ImgMaxService } from "ng2-img-max";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-david",
  templateUrl: "./david.component.html",
  styleUrls: ["./david.component.css"],
})
export class DavidComponent {
  form: FormGroup;
  picture: File;
  picturePreview: string | ArrayBuffer;
  formdata: FormData;
  place: string;
  year: string;
  date = new Date();
  currentYear: number;
  month: string;
  color: string;
  colors: any;
  message: string;
  error = false;
  msgError: string;
  fileContent: any;
  submitted = false;
  showLoader = false;

  constructor(
    private uploadService: UploadService,
    private myApiService: MyApiService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {
    this.getColors();
    this.currentYear = this.date.getFullYear();
  }

  getColors() {
    this.myApiService.getColorsInfos().subscribe((response) => {
      this.colors = response;
    });
  }

  onChange(event: EventTarget) {
    this.picturePreview = "";
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    const image = files[0];
    this.ng2ImgMax.resizeImage(image, 500, 10000).subscribe(
      (result) => {
        this.picture = new File([result], result.name);
        this.getImagePreview(this.picture);
      },
      (error) => {
        console.log("😢 Oh no!", error);
      }
    );
    this.ng2ImgMax.compressImage(image, 3).subscribe(
      (result) => {
        this.picture = new File([result], result.name);
        const formData: FormData = new FormData();
        formData.append("uploadFile", this.picture, this.picture.name);
        this.formdata = formData;
      },
      (error) => {
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
    this.formdata.delete("place");
    this.formdata.delete("year");
    this.formdata.delete("month");
    this.formdata.delete("color");
    this.formdata.append("place", this.place);
    this.formdata.append("year", this.year);
    this.formdata.append("month", this.month);
    this.formdata.append("color", this.color);

    this.uploadService.sendPicture(this.formdata).subscribe((data) => {
      if (data.status === "success") {
        this.error = false;
        this.message = data.message;
        this.submitted = true;
      } else {
        this.error = true;
        this.msgError = data.message;
        this.showLoader = false;
      }
    });
  }
}
