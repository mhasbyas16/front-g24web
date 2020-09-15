import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-gift-souvenir',
  templateUrl: './card-gift-souvenir.component.html',
  styleUrls: ['./card-gift-souvenir.component.scss']
})
export class CardGiftSouvenirComponent implements OnInit {
  @Input() li:any;
  @Input() product:any;
  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

}
