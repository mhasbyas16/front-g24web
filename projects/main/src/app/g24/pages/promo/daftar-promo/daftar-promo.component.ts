import { Component, OnInit } from '@angular/core';

import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';

@Component({
  selector: 'app-daftar-promo',
  templateUrl: './daftar-promo.component.html',
  styleUrls: ['./daftar-promo.component.scss']
})
@DContent(DaftarPromoComponent.key)
export class DaftarPromoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static key = EMenuID.DAFTAR_PROMO;
}
