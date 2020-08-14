import { Component, OnInit } from '@angular/core';
import { EMenuID } from 'src/app/lib/enums/emenu-id.enum';
import { DContent } from 'src/app/decorators/content/pages';

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
