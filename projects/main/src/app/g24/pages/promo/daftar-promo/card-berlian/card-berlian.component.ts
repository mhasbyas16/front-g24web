import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-berlian',
  templateUrl: './card-berlian.component.html',
  styleUrls: ['./card-berlian.component.scss']
})
export class CardBerlianComponent implements OnInit {
  @Input() li:any;
  @Input() product:any;
  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

}
