
export class ModuleLoader
{
    private static _modules : Map<string, any> = new Map();
    private static _loadedModules : Set<string> = new Set();

    /**
     * Returns a copy of the Known _modules
     */
    public static GetModules() : Map<string, any>
    {
        let ret : Map<string, any> =  new Map();
        for(let i = 0; i < this._modules.values.length; i++)
        {
            ret.set(this._modules.keys[i], this._modules.values[i]);
        }
        return ret;
    }

    /**
     * 
     */
    public static GetLoadedModules() : any
    {
        return this._loadedModules.values
    }

    public static register(key : string, cls : any)
    {
        if(this._modules.has(key)) return;

        this._modules.set(key, cls);
    }

    public static LoadModule(id : string)
    {
        if(this._loadedModules.has(id))
        {
            console.log("Module: " + id + " already loaded.");
            return;
        }
        this._modules.get(id)();
        this._loadedModules.add(id);
    }

    public static log()
    {
        console.log(ModuleLoader._modules)
    }
}

export const DLazyModule = (key : string, module : any) : any =>
{
    window['ModuleLoader'] = ModuleLoader
    ModuleLoader.register(key, module);
}