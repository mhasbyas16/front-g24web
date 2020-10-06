import { Component, OnInit } from '@angular/core';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../../decorators/content/pages';
@Component({
  selector: 'app-mulia-manual',
  templateUrl: './mulia-manual.component.html',
  styleUrls: ['./mulia-manual.component.scss']
})

@DContent(MuliaManualComponent.key)
export class MuliaManualComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  static key = EMenuID.BUYBACKMANUAL
}
