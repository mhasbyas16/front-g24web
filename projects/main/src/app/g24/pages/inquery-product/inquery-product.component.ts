import { Component, OnInit } from '@angular/core';
import { DContent } from '../../decorators/content/pages';
import { EMenuID } from '../../lib/enums/emenu-id.enum';
@Component({
  selector: 'app-inquery-product',
  templateUrl: './inquery-product.component.html',
  styleUrls: ['./inquery-product.component.scss']
})

@DContent(InqueryProductComponent.key)
export class InqueryProductComponent implements OnInit {

  static key = EMenuID.INQUERY_PRODUCT;
  constructor() { }

  dashboardActive : Boolean = false;

  ngOnInit(): void {
  }

}
