
export class ModalOutlet {
    private static _component: IModalOutlet;
    public static get Component(): IModalOutlet {
        return this._component;
    }
    public static set Component(value: IModalOutlet) {
        this._component = value;
    }

    private static _activeModal: string = '';
    public static get ActiveModal(): string
    {
        return this._component.GetActiveModal();
    }

    private static _activeComponent : any = null;
    public static get ActiveComponent() : any
    {
        return this._component.LoadModal();
    }

    /**
     * Changes the Active Content Component
     * @param newContent - The 'name' of the Content Component to changed into
     * @param render - Also updates the view (default: false)
     * @param embed - Extend the selected pages (dafault: false)
     */
    public static AddModal(newContent : string, render : boolean = false)
    {
        this._activeModal = newContent;
        console.log(this.Component)

        if(!render) return;
        this._activeComponent = this._component.LoadModal();
    }

    public static RemoveModal(component : any)
    {
        this._component.RemoveModal(component)
    }

    public static Pop()
    {
        this._component.Pop();
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
    LoadModal() : any

    ClearModals() : void
    AddModal() : void
    RemoveModal(component : any) : void
    Pop() : void

    GetModals() : any[]
}
