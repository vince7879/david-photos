import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginModule } from "./login/login.module";
import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DavidComponent } from "./david/david.component";

import { MyApiService } from "./my-api.service";
import { LoggedInGuardService } from "./logged-in-guard.service";
import { LoginService } from "./login/login.service";
import { UploadService } from "./david/upload.service";
import { FileValidatorDirective } from "./file-validator.directive";
import { FileValueAccessorDirective } from "./file-value-accessor.directive";
import { PreviewDirective } from "./gallery/preview.directive";
import { PictureDetailComponent } from "./picture-detail/picture-detail.component";
import { RecentPictureComponent } from "./recent-picture/recent-picture.component";
import { RecentComponent } from "./recent/recent.component";
import { BackendComponent } from "./backend/backend.component";

import { OrderListModule } from "primeng/primeng";
import { DragulaModule } from "ng2-dragula";
import { EditPictureComponent } from "./edit-picture/edit-picture.component";
import { Ng2ImgMaxModule } from "ng2-img-max";
import { AccountComponent } from "./account/account.component";
import { NavBackendComponent } from "./nav-backend/nav-backend.component";
import { RecentDirective } from "./dashboard/recent.directive";

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
    RecentPictureComponent,
    RecentComponent,
    BackendComponent,
    EditPictureComponent,
    ConfirmationDialogComponent,
    AccountComponent,
    NavBackendComponent,
    RecentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    OrderListModule,
    DragulaModule,
    MatDialogModule,
    BrowserAnimationsModule,
    Ng2ImgMaxModule,
  ],
  providers: [MyApiService, LoggedInGuardService, LoginService, UploadService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule {}
