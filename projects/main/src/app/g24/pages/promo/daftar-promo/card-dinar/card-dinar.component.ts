import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-card-dinar',
  templateUrl: './card-dinar.component.html',
  styleUrls: ['./card-dinar.component.scss']
})
export class CardDinarComponent implements OnInit {

  @Input() li:any;
  @Input() product:any;
  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

}
