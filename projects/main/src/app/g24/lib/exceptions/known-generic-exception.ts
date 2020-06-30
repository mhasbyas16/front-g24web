export class KnownGenericException extends Error {

    constructor(private nMessage? : string)
    {
        super();
        super.message = nMessage == null || nMessage === '' ? this.defaultMessage : nMessage
    }

    private _code : string = '14'
    public get Code()
    {
        return this._code
    }

    private defaultMessage : string = 'Definisikan di constructor dulu message nya';
}
