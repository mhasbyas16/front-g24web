import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';

@Component({
  selector: 'app-approval-konversi',
  templateUrl: './approval-konversi.component.html',
  styleUrls: ['./approval-konversi.component.scss']
})

@DContent(ApprovalKonversiComponent.key)
export class ApprovalKonversiComponent implements OnInit {
static key = EMenuID.APP_KONVERSI;

  constructor() { }

  ngOnInit(): void {
  }

}
