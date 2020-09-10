import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-mulia',
  templateUrl: './card-mulia.component.html',
  styleUrls: ['./card-mulia.component.scss']
})
export class CardMuliaComponent implements OnInit {
  @Input() li:any;
  @Input() product:any;
  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

}
