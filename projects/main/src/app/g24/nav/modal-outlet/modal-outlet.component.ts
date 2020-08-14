import { Component, OnInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { ViewCompileResult } from '@angular/compiler/src/view_compiler/view_compiler';
import { ModalOutlet, IModals } from '../../lib/helper/modal-outlet';
import { Modals } from '../../decorators/modal/modals';

@Component({
  selector: 'modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss']
})
export class ModalOutletComponent implements OnInit {

  @ViewChild('container', {read : ViewContainerRef}) container : ViewContainerRef;

  constructor(private resolver : ComponentFactoryResolver)
  {
    
  }

  GetComponentRef(): ComponentRef<any> {
    throw new Error("Method not implemented.");
  }

  GetModals(): any[]
  {
    return ModalOutlet.Modals;
  }

  AddModal(modalID : string): void
  {
    this.LoadModal(modalID);
  }
  
  LoadModal(modalID : string): ComponentRef<any>
  {
    console.log('LoadModal called...')
    const class2Create = Modals.get(modalID);
    if(class2Create == null)
    {
      console.info('Page Name not found. Name: ' + modalID);
      return;
    }
    // these creates a Component Instance by a supplied class2Create
    const cls = Object.create(class2Create.prototype);
    console.log(cls.constructor, 'cls');
    const factory = this.resolver.resolveComponentFactory(cls.constructor);
    console.log(factory);
    let comp = this.container.createComponent(factory);
    console.log(comp)
    let modal : IModals = <IModals><unknown>comp.instance;
    modal.SetComponentRef(comp);
    return comp;
  }

  ngOnInit(): void {
    ModalOutlet.Outlet = this;
  }

}
