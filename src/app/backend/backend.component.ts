import { Component, OnInit, DoCheck } from '@angular/core';
// import {OrderListModule} from 'primeng/primeng';

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
                // dragulaService.drag.subscribe((value) => {
                //   console.log(`drag: ${value[0]}`);
                //   this.onDrag(value.slice(1));
                // });
                // dragulaService.drop.subscribe((value) => {
                //   console.log(`drop: ${value[0]}`);
                //   this.onDrop(value.slice(1));
                // });
                // dragulaService.over.subscribe((value) => {
                //   console.log(`over: ${value[0]}`);
                //   this.onOver(value.slice(1));
                // });
                // dragulaService.out.subscribe((value) => {
                //   console.log(`out: ${value[0]}`);
                //   this.onOut(value.slice(1));
                // });
                const bag: any = this.dragulaService.find('bag-one');
                if (bag !== undefined ) {
                  this.dragulaService.destroy('bag-one');
                }
                dragulaService.setOptions('bag-one', {});
                dragulaService.dropModel.subscribe((value) => {
                  // console.log(`drop: ${value[0]}`);
                  this.onDropModel(value);
                });
               }

    private onDrag(args) {
    const [e, el] = args;
    // do something
    console.log(e.id);
    console.log(e.className);
    // console.log(el.className);
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
    // console.log(e.className);
    // do something
    // console.log(e);
    // console.log(el.className);
    // console.log(container);
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    // do something else
    // console.log(el);
    // console.log(target);
    // console.log(source);
    // console.log(this.picture_collection.length);
    this.myApiService.setNewOrder(this.picture_collection).subscribe(response => {
      console.log(response);
    });
    // for (let i = 0; i < this.picture_collection.length; i++) {
    //   let newRank = i + 1;
    //   console.log('unikId = ' + this.picture_collection[i].id);
    //   console.log('newRank = ' + newRank);
    // }

  }

  // private onRemoveModel(args) {
  //   const [el, source] = args;
  //   console.log(el);
  //   console.log(source);
  // }

  ngOnInit() {
    this.baseUrl = this.myApiService.getBaseUrl();
    this.getHexacode();
    this.getColorsMenu();
    this.getPicturesToEdit();
  }

  ngDoCheck() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.color = params.color;
      // console.log(this.color);
    });
    if (this.oldColor !== this.color) {
      this.getHexacode();
      this.getColorsMenu();
      this.getPicturesToEdit();
    }
  }

  getHexacode() {
    // console.log(this.color);
    if (!this.color) {
      // console.log('nope');
      this.newPage = true;
    } else {
      this.newPage = false;
      this.myApiService.getHexacodeColor(this.color).subscribe(response => {
        this.hexacode = response.json().hexacode;
        // console.log(this.hexacode);
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
      // console.log(this.picture_collection);
    });
  }

}
