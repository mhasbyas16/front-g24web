import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  okButton = null;
  cancelButton = null;

  constructor() { }

  ngOnInit(): void {
  }

  confirmation(title:string, message:string, okButton?:string, cancelButton?:string) {
    let ok = "Ok";
    if (okButton != undefined) {
      ok = okButton;
    }
    let cancel = undefined;
    if (cancelButton != undefined) {
      cancel = cancelButton;
    }

  }

}
