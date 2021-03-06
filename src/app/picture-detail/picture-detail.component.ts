import { Component, OnInit, DoCheck, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MyApiService } from "../my-api.service";

@Component({
  selector: "app-picture-detail",
  templateUrl: "./picture-detail.component.html",
  styleUrls: ["./picture-detail.component.scss"],
})
export class PictureDetailComponent
  implements OnInit, DoCheck, AfterViewChecked {
  baseUrl: string;
  picture: any = {};
  color: string;
  hexacode: string;
  rank: number;
  oldRank: number;
  lastRank: number;
  picId: number;
  oldPicId: number;
  picNb: number;
  arrowColor = "white";
  loaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private myApiService: MyApiService,
    private location: Location,
    private router: Router
  ) {
    this.picId = this.activatedRoute.snapshot.params["id"];
    this.color = this.activatedRoute.snapshot.params["color"];
    if (this.color === "Blanc" || this.color === "Noir-Blanc") {
      this.arrowColor = "black";
    }
  }

  displayPic() {
    this.loaded = true;
  }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getPictureDetailById(this.picId);
    this.getPicNbByColor(this.color);
    this.getHexacode();
  }

  ngDoCheck() {
    if (this.oldPicId !== this.picId) {
      this.getPictureDetailById(this.picId);
    }
  }

  ngAfterViewChecked() {
    this.picture.id &&
      this.location.go(`/picture/${this.color}/${this.picture.id}`);
  }

  findNextPic() {
    this.loaded = false;
    this.rank = this.rank + 1;
    this.getPictureIdByColorAndRank(this.color, this.rank);
  }

  findPrevPic() {
    this.loaded = false;
    this.rank = this.rank - 1;
    this.getPictureIdByColorAndRank(this.color, this.rank);
  }

  getPictureDetailById(id) {
    this.oldPicId = id;
    this.myApiService.getPicture(id).subscribe((response) => {
      if (!response.json().data) {
        this.router.navigate(["/404"]);
      }
      this.picture = response.json().data;
      this.rank = this.picture.rank;
      this.oldRank = this.rank;
    });
  }

  getPictureIdByColorAndRank(color, rank) {
    this.oldPicId = this.picId;
    this.myApiService
      .getPictureIdByColorAndRank(color, rank)
      .subscribe((response) => {
        this.picId = response.json().data.id;
      });
  }

  getHexacode() {
    this.myApiService.getHexacodeColor(this.color).subscribe((response) => {
      this.hexacode = response.json().hexacode;
    });
  }

  getPicNbByColor(color) {
    this.myApiService.getPicNbByColor(color).subscribe((response) => {
      if (!response.json().data) {
        this.router.navigate(["/404"]);
      }
      this.picNb = response.json().data;
    });
  }
}
