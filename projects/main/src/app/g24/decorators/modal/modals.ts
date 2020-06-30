export class Modals {

    private static pages : Map<string, any> = new Map();

    public static register(key: string, cls : any) : void
    {
        Modals.pages.set(key, cls);
    }

    public static get(key : string)
    {
        // if(Modals.get(key) == null) throw new KnownGenericException()
        return Modals.pages.get(key);
    }
}

export const DModal = (key : string) : any =>
{
    return (cls) =>
    {
        Modals.register(key, cls);
    }
}
