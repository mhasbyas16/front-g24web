import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-perhiasan',
  templateUrl: './card-perhiasan.component.html',
  styleUrls: ['./card-perhiasan.component.scss']
})
export class CardPerhiasanComponent implements OnInit {
  @Input() li:any;
  @Input() product:any;
  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

}
