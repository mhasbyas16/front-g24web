import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-layout',
  templateUrl: './security-layout.component.html',
  styleUrls: ['./security-layout.component.scss']
})
export class SecurityLayoutComponent implements OnInit {

  collapsible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
