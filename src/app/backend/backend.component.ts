import { Component, OnInit, DoCheck } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {MyApiService} from '../my-api.service';

import { DragulaService } from 'ng2-dragula';



@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements DoCheck, OnInit {

  baseUrl: string;
  newPage: boolean;
  color: string;
  hexacode: string;
  oldColor: string;
  color_collection: any;
  picture_collection: any;

  constructor(private activatedRoute: ActivatedRoute,
              private myApiService: MyApiService,
              private dragulaService: DragulaService) {
                const bag: any = this.dragulaService.find('bag-one');
                if (bag !== undefined ) {
                  this.dragulaService.destroy('bag-one');
                }
                dragulaService.setOptions('bag-one', {});
                dragulaService.dropModel.subscribe((value) => {
                  this.onDropModel(value);
                });
               }

    private onDrag(args) {
    const [e, el] = args;
    // do something
  }

  private onDrop(args) {
    const [e, el] = args;
    // do something
  }

  private onOver(args) {
    const [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    const [e, el, container] = args;
    // do something
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    this.myApiService.setNewOrder(this.picture_collection).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getHexacode();
    this.getColorsMenu();
    this.getPicturesToEdit();
  }

  ngDoCheck() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.color = params.color;
    });
    if (this.oldColor !== this.color) {
      this.getHexacode();
      this.getColorsMenu();
      this.getPicturesToEdit();
    }
  }

  getHexacode() {
    if (!this.color) {
      this.newPage = true;
    } else {
      this.newPage = false;
      this.myApiService.getHexacodeColor(this.color).subscribe(response => {
        this.hexacode = response.json().hexacode;
      });
    }
  }

  getColorsMenu() {
    this.oldColor = this.color;
    this.myApiService.getColorsMenu(this.color).subscribe(response => {
      this.color_collection = response.json();
    });
  }

  getPicturesToEdit() {
    this.myApiService.PicturesToEdit(this.color).subscribe(response => {
      this.picture_collection = response.json();
    });
  }

}
