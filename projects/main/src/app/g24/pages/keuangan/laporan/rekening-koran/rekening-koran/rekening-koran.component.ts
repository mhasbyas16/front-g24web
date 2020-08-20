import { Component, OnInit } from '@angular/core';
import { DContent } from 'projects/main/src/app/g24/decorators/content/pages';
import { EMenuID } from 'projects/main/src/app/g24/lib/enums/emenu-id.enum';

@Component({
  selector: 'app-rekening-koran',
  templateUrl: './rekening-koran.component.html',
  styleUrls: ['./rekening-koran.component.scss']
})
@DContent(RekeningKoranComponent.key)

export class RekeningKoranComponent implements OnInit {

  static key = EMenuID.REKENING_KORAN;

  constructor() { }

  ngOnInit(): void {
  }

}
