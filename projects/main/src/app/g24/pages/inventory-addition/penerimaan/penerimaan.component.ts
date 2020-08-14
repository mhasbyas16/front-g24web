import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';

@Component({
  selector: 'app-penerimaan',
  templateUrl: './penerimaan.component.html',
  styleUrls: ['./penerimaan.component.css']
})
@DContent(PenerimaanComponent.key)
export class PenerimaanComponent implements OnInit {
  static key = EMenuID.PENERIMAAN;

  constructor() { }

  ngOnInit(): void {
  }

}
