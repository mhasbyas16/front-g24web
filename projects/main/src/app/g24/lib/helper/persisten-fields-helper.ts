import { BasePersistentFields } from '../base/base-persistent-fields';

/**
 * To Be Defined:
 * 1. Use SessionStorage or CookieStorage
 */
export abstract class PersistentFieldsHelper {
    private static _PersistedFields : Map<any,any> = new Map<any,any>();

    /**
     * Persist an instance fields by refering to it's class
     * 
     * This typically used to prevent retyping/persisting an already inserted fields
     * in case of changes of page content
     * 
     * @param cls : any, a Class/Type of the persisted instance
     * @param fields : any, an Object that consist of fields that are going to be used as reference for restoring fields
     */
    public static PersistInstance(cls: any, fields: any)
    {
        this._PersistedFields.set(cls,fields);
    }

    /**
     * Returns the Object persisted by Class
     * @param cls : any, the Class of the persisted instance
     * @return the persisted instance typed Object
     */
    public static GetPersistedInstance(cls: any)
    {
        return this._PersistedFields.get(cls);
    }

    /**
     * Restore 'toRestore' with fields in 'persistedInstance'
     * 
     * @param toRestore : any, the Instance to be restored into
     * @param persistedInstance : any, the Instance with fields for restoration
     */
    public static RestoreFields(toRestore : any, persistedInstance: any)
    {
        // console.log(toRestore);
        if(toRestore instanceof BasePersistentFields)
            (<BasePersistentFields>toRestore).RestoreFields(persistedInstance);
    }

}
