import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  private defaultText : string = "Loading ...";
  private spinnerText : string = "Loading ...";
  public get SpinnerText()
  {
    return this.spinnerText;
  }

  private isOpen : boolean = false;
  public get IsOpen() : boolean
  {
    return this.isOpen;
  }
  public set IsOpen(open)
  {
    this.isOpen = open;
  }

  ngOnInit(): void {
  }

  SetSpinnerText(txt : string)
  {
    this.spinnerText = txt;
  }

  Close()
  {
    this.isOpen = false;
    this.spinnerText = this.defaultText;
  }

  Open()
  {
    this.isOpen = true;
  }

}
