import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DavidComponent } from './david/david.component';

import {MyApiService} from './my-api.service';
import { LoggedInGuardService } from './logged-in-guard.service';
import { LoginService } from './login/login.service';
import {UploadService} from './david/upload.service';
import { FileValidatorDirective } from './file-validator.directive';
import { FileValueAccessorDirective } from './file-value-accessor.directive';
import { PreviewDirective } from './gallery/preview.directive';
import { PictureDetailComponent } from './picture-detail/picture-detail.component';
import { RecentComponent } from './recent/recent.component';
import { BackendComponent } from './backend/backend.component';

import {OrderListModule} from 'primeng/primeng';
import { DragulaModule } from 'ng2-dragula';
import { EditPictureComponent } from './edit-picture/edit-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GalleryComponent,
    PageNotFoundComponent,
    DavidComponent,
    FileValidatorDirective,
    FileValueAccessorDirective,
    PreviewDirective,
    PictureDetailComponent,
    RecentComponent,
    BackendComponent,
    EditPictureComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    LoginModule,
    OrderListModule,
    DragulaModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    MyApiService,
    LoggedInGuardService,
    LoginService,
    UploadService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
