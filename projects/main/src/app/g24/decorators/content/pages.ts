
export class Pages {

    private static pages : Map<string, any> = new Map();

    public static register(key: string, cls : any) : void
    {
        Pages.pages.set(key, cls);
    }

    public static get(key : string)
    {
        // if(Pages.get(key) == null) throw new KnownGenericException()
        return Pages.pages.get(key);
    }

    public static call()
    {
        console.log(Pages.pages)
    }
}

/**
 * To Use:
 * 
 * Add a line >>> static key = 'your-unique-page-key'. Then add your Component class to entryComponents in app.module.ts
 * 
 * @param key - atau ID pemanggil dari Class Component nya
 */
export const DContent = (key : string) : any =>
{
    return (cls) =>
    {
        console.log(key, "key");
        Pages.register(key, cls);
    }
}
