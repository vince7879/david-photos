import { Component, OnInit, DoCheck, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MyApiService } from "../my-api.service";

@Component({
  selector: "app-recent-picture",
  templateUrl: "./recent-picture.component.html",
  styleUrls: ["./recent-picture.component.scss"],
})
export class RecentPictureComponent
  implements OnInit, DoCheck, AfterViewChecked {
  baseUrl: string;
  picture: any = {};
  picId: number;
  loaded = false;
  recentPhotosCollection = [];
  currentIndex: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private myApiService: MyApiService,
    private location: Location,
    private router: Router
  ) {
    this.picId = this.activatedRoute.snapshot.params["id"];
  }

  displayPic() {
    this.loaded = true;
  }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getRecentPictureDetailById(this.picId);
    this.getRecentCollection();
  }

  ngDoCheck() {
    this.currentIndex = this.recentPhotosCollection
      .map((r) => r.id)
      .indexOf(this.picture.id);
  }

  ngAfterViewChecked() {
    this.picture.id && this.location.go(`/recent/${this.picture.id}`);
  }

  findNextPic() {
    this.loaded = false;
    const nextIndex = this.currentIndex + 1;
    const nextPic = this.recentPhotosCollection.find((v, i) => i === nextIndex);
    this.getRecentPictureDetailById(nextPic.id);
  }

  findPrevPic() {
    this.loaded = false;
    const prevIndex = this.currentIndex - 1;
    const prevPic = this.recentPhotosCollection.find((v, i) => i === prevIndex);
    this.getRecentPictureDetailById(prevPic.id);
  }

  getRecentPictureDetailById(id) {
    this.myApiService.getPictureInfo(id).subscribe((response) => {
      if (!response.data) {
        this.router.navigate(["/404"]);
      }
      this.picture = response.data;
    });
  }

  getRecentCollection() {
    this.myApiService.getRecentPic().subscribe((response) => {
      this.recentPhotosCollection = response.data;
    });
  }
}
