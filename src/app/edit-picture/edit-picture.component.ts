import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyApiService } from '../my-api.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.css']
})
export class EditPictureComponent implements OnInit {

  baseUrl: string;
  picture: any = {};
  place: string;
  year: any;
  date = new Date();
  currentYear: number;
  month: string;
  oldColor: string;
  newColor: string;
  name: string;
  colors: any;
  details: any = {};
  error = false;
  msgError: string;
  msgSuccess = '';
  message: string;
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  picRemoved = false;

  constructor(private activatedRoute: ActivatedRoute, private myApiService: MyApiService, public dialog: MatDialog) {
    this.oldColor = this.activatedRoute.snapshot.params['color'];
    this.currentYear = this.date.getFullYear();
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
      this.name = this.picture.name;
    });
  }

  getColors() {
    this.myApiService.getColorsInfos().subscribe(response => {
      // console.log(response);
      this.colors = response;
    });
  }

  modifyPic() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = 'Etes-vous sûr de vouloir enregistrer ces modifications ?';
    this.dialogRef.componentInstance.confirmBtn = 'Enregistrer';
    this.dialogRef.componentInstance.classBtn = 'success';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
          // console.log(data);
          // this.message = data.message;
          if (data.status === 'success') {
            this.error = false;
            this.msgSuccess = data.message;
            // this.submitted = true;
          } else {
            this.error = true;
            this.msgError = data.message;
            // this.showLoader = false;
          }
        });
      }
      this.dialogRef = null;
    });
  }

  deletePicture() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = 'Etes-vous sûr de vouloir supprimer cette photo ?';
    this.dialogRef.componentInstance.confirmBtn = 'Supprimer';
    this.dialogRef.componentInstance.classBtn = 'danger';

    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        this.details = {
          'id': this.activatedRoute.snapshot.params['id'],
          'color': this.oldColor,
          'picName': this.name
        };
        this.myApiService.removePicture(this.details).subscribe(response => {
          // console.log(response);
          this.message = response.message;
          if (response.status === 'success') {
            this.error = false;
            this.message = response.message;
            this.picRemoved = true;
            // console.log(this.picRemoved);
          } else {
            this.error = true;
            this.msgError = response.message;
            this.picRemoved = false;
          }
        });
      }
      this.dialogRef = null;
    });
  }

}
