import { Component, OnInit, ComponentRef } from '@angular/core';
import { IModalOutlet, ModalOutlet } from '../../lib/helper/modal-outlet';
@Component({
  selector: 'modal-outlet',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, IModalOutlet {

  private _modals : any[]

  constructor()
  {
    
  }

  Pop(): void
  {
    this._modals.pop()
  }

  GetModals(): any[]
  {
    return this._modals;
  }
  AddModal(): void
  {
    
  }

  GetActiveModal(): any
  {
    this._modals[this._modals.length-1];
  }

  ClearModals(): void
  {
    while(this._modals.length > 0)
    {
      this._modals.pop();
    }
  }

  RemoveModal(component : any): void
  {
    let idx = this._modals.indexOf(component);
    (<ComponentRef<any>>this._modals[idx]).destroy();
  }
  
  LoadModal(): void
  {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    ModalOutlet.Component = <IModalOutlet><unknown>this;
  }

}
