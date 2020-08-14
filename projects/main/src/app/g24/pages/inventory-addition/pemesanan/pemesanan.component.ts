import { Component, OnInit } from '@angular/core';
import { DContent } from 'src/app/decorators/content/pages';
import { EMenuID } from 'src/app/lib/enums/emenu-id.enum';

@Component({
  selector: 'app-pemesanan',
  templateUrl: './pemesanan.component.html',
  styleUrls: ['./pemesanan.component.scss']
})

@DContent(PemesananComponent.key)
export class PemesananComponent implements OnInit {

  static key = EMenuID.ORDER;

  constructor() { }

  ngOnInit(): void {
  }

}
