
export class ContentPage {
    private static _component: IContent;
    public static get Component(): IContent {
        return this._component;
    }
    public static set Component(value: IContent) {
        this._component = value;
    }

    private static _activeContent: string = '';
    public static get ActiveContent(): string {
        if(this._activeContent == '') this._activeContent = this.DefaultPage;
        return this._activeContent;
    }

    private static _activeComponent : any = null;
    public static get ActiveComponent() : any
    {
        return this._activeComponent;
    }

    /**
     * Changes the Active Content Component
     * @param newContent - The 'name' of the Content Component to changed into
     * @param render - Also updates the view (default: false)
     * @param embed - Extend the selected pages (dafault: false)
     */
    public static ChangeContent(newContent : string, render : boolean = false, embed : boolean = false)
    {
        this._activeContent = newContent;
        console.log(this.Component)

        if(!embed) this._component.ClearContent();

        if(!render) return;
        this._activeComponent = this._component.LoadContent();
    }

    /**
     * Renders the Content's View active page
     */
    public static UpdateView()
    {
        this._component.LoadContent();
    }

    /**
     * To Be Defined:
     * Cookie/Local Storage
     */
    private static LocalSettings = 
    {
        getLocal : false,
        defaultLanding : 'home'
    }

    private static defaultPage : string = 'inisiasi';
    public static get DefaultPage()
    {
        return this.LocalSettings.getLocal ? this.LocalSettings.defaultLanding : this.defaultPage;
    }
}

/**
 * To be Defined:
 * 
 * Future request, ContentPage will become a Utility Class for changing the content of a View
 * by implementing IContent in the View's Class
 */
export interface IContent
{
    GetActivePage() : string
    ClearContent() : void
    LoadContent() : any
}
