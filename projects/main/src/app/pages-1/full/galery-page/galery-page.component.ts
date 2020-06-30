import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galery-page',
  templateUrl: './galery-page.component.html',
  styleUrls: ['./galery-page.component.scss']
})
export class GaleryPageComponent implements OnInit {

  productCategories = null;
  products = null;
  

  constructor() { }

  ngOnInit(): void {
  }

}
