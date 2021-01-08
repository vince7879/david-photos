import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BackendComponent } from '../backend/backend.component';
import { EditPictureComponent } from '../edit-picture/edit-picture.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { RecentComponent } from '../recent/recent.component';
import { PictureDetailComponent } from '../picture-detail/picture-detail.component';
import { RecentPictureComponent } from '../recent-picture/recent-picture.component';
import { DavidComponent } from '../david/david.component';
import { LoginComponent } from '../login/login.component';
import { AccountComponent } from '../account/account.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoggedInGuardService} from '../logged-in-guard.service';

const routes: Routes = [
  {
      path: 'backend',
      component: BackendComponent,
      canActivate : [LoggedInGuardService]
  },
  {
      path: 'edit/:color/:id',
      component: EditPictureComponent,
      canActivate : [LoggedInGuardService]
  },
  {
      path: 'gallery',
      component: GalleryComponent,
  },
  {
      path: 'recent',
      component: RecentComponent,
  },
  {
      path: 'recent/:id',
      component: RecentPictureComponent,
  },
  {
      path: 'picture/:color/:id',
      component: PictureDetailComponent,
  },
  {
      path: 'login',
      component: LoginComponent,
  },
  {
    path: 'david',
    component: DavidComponent,
    canActivate : [LoggedInGuardService]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate : [LoggedInGuardService]
  },
  {
      path: '',
      component: DashboardComponent,
  },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
