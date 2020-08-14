import { ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EPriviledge } from '../enums/epriviledge.enum';
import { ModalOutletComponent } from '../../nav/modal-outlet/modal-outlet.component';

export class ModalOutlet {
    private static _modal_outlet_: ModalOutletComponent;
    private static _modals_ : ComponentRef<any>[] = [];

    public static get Outlet(): ModalOutletComponent {
        return this._modal_outlet_;
    }
    public static set Outlet(value: ModalOutletComponent) {
        this._modal_outlet_ = value;
    }

    public static get Modals()
    {
        return [...this._modals_];
    }

    public static get ActiveModal(): ComponentRef<any>
    {
        return this._modals_[this._modals_.length-1];
    }

    /**
     * Changes the Active Content Component
     * @param modalID - The 'name' of the Content Component to changed into
     */
    public static AddModal(modalID : string) : ComponentRef<any>
    {
        let modal = this._modal_outlet_.LoadModal(modalID);
        this._modals_.push(modal);
        return modal;
    }

    public static RemoveModal(component : any)
    {
        let idx = this._modals_.indexOf(component);
        this._modals_[idx].destroy();
        this._modals_ = this._modals_.slice(idx, 1);
    }

    public static Pop()
    {
        this._modals_.pop().destroy();;
    }

    public static LoadModel(cls : any, resolver : ComponentFactoryResolver, container : ViewContainerRef) : ComponentRef<any>
    {
        // these creates a Component Instance by a supplied class2Create
        console.log(cls, 'cls');
        const factory = resolver.resolveComponentFactory(cls);
        console.log(factory);
        let comp = container.createComponent(factory);
        console.log(comp)
        let modal : IModals = <IModals><unknown>comp.instance;
        modal.SetComponentRef(comp);
        return comp;
    }
}

/**
 * To be Defined:
 * 
 * Future request, ContentPage will become a Utility Class for changing the content of a View
 * by implementing IContent in the View's Class
 */
export interface IModalOutlet
{
    GetActiveModal() : any
    LoadModal(string : string) : any
    GetComponentRef() : ComponentRef<any>

    ClearModals() : void
    AddModal() : void
    RemoveModal(component : any) : void
    Pop() : void

    GetModals() : any[];
}

export interface IModals
{
    SetContent(item : any) : any;
    GetParent();
    SetParent(parent : any);
    SetTitle(title : string);
    SetMode(mode : EPriviledge);

    SetComponentRef(componentRef : ComponentRef<any>);
    GetComponentRef() : ComponentRef<any>;

    OnClose(flag : string);
}
