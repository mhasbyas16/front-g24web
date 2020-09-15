import { PersistentFieldsHelper } from '../helper/persisten-fields-helper';


export abstract class BasePersistentFields {

    constructor()
    {
        this.PersistFieldOnEvents();
    }

    PersistFieldOnEvents()
    {
        document.body.addEventListener('click', () => this.PersistFields());
        document.body.addEventListener('keydown', () => this.PersistFields());
        document.body.addEventListener('keyup', () => this.PersistFields());
        document.body.addEventListener('keypress', () => this.PersistFields());
    }

    protected PersistFields()
    {
        // let fields = [];
        // for(let key in Object.keys(this))
        // {
        //     fields.push(this[key]);
        // }
        let fields = {};
        Object.assign(fields, this);
        // console.log("27 " + this)
        PersistentFieldsHelper.PersistInstance(this.constructor, fields);
        // console.log(fields);
    }

    public RestoreFields(persistedRef)
    {
        Object.assign(this, persistedRef);
    }


}
