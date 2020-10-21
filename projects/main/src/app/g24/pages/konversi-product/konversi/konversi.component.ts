import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';

@Component({
  selector: 'app-konversi',
  templateUrl: './konversi.component.html',
  styleUrls: ['./konversi.component.scss']
})

@DContent(KonversiComponent.key)
export class KonversiComponent implements OnInit {
static key = EMenuID.KONVERSI;

  constructor() { }

  ngOnInit(): void {
  }

}
