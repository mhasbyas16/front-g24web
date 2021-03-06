import { isArray } from 'util';

export class DataTypeUtil {
    public static ConvertTo(data : any, type : string)
    {
        switch(type)
        {
            case DataTypeUtil.Types.Boolean:
                return Boolean(data);
                
            case DataTypeUtil.Types.Integer:
                return parseInt(data);

            case DataTypeUtil.Types.Float:
                return parseFloat(data);

            // case DataTypeUtil.Types.Long:
            //     return BigInt(data);

            case DataTypeUtil.Types.Object:
                return Object(data);
            
            case DataTypeUtil.Types.Symbol:
                return Symbol(data);
            
            case DataTypeUtil.Types.Function:
                return Function(data);
            
            default:
                return null;
        }
    }

    /**
     * 
     * @param source 
     */
    public static URLEncode(toConvert)
    {
        const formBody = [];
        for (const property in toConvert) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(toConvert[property]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }

    /**
     * Append '*_encoded' to 'source' to 'source' field if there is any
     * 
     * Note: see ConvertTo()
     * 
     * @param source any : The object to append the field in
     */
    public static Encode(source :any)
    {
        let toAppend = {};
        for(let key in source)
        {
            let tipe_data = typeof source[key];

            if(tipe_data == 'boolean') continue;

            if(source.hasOwnProperty(key+"_encoded")) // mencegah duplikat *_encoded
            {
                continue;
            }

            if(key === "__format") // untuk format tidak perlu di encode
            {
                continue;
            }

            if(typeof source[key] === 'string' || typeof source[key] === 'number' ||
                source[key] == null || source[key] == "null")
                continue;
            
            if(key.endsWith("_format_counter") || key.endsWith("format_field"))
                continue;

            if(key.endsWith("_encoded")) continue;
            
            toAppend[key+"_encoded"] = this.GetEncoding(source[key]);
            toAppend[key] = btoa(JSON.stringify(source[key]));
        }

        Object.assign(source, toAppend);
        return source;
    }

    public static Object2Url(source : any)
    {
        let ret = "";

        for(let key in source)
        {
            ret += key +"="+ source[key]+"&";
        }

        ret = ret.endsWith("&") ? ret.substring(0, ret.length-1) : ret;

        return ret;
    }

    private static GetEncoding(value : any) : string
    {
        let ret = null;

        switch(typeof value)
        {
            case 'object':
                if(isArray(value))
                    return this.Types.Base64Array;
                else
                    return this.Types.Base64;
                break;
            
            case 'number':
                if(Number.isInteger(value))
                    return this.Types.Integer;
                else
                    return this.Types.Double;
                break;
            
            default:
                break;

        }

        return ret;
    }

    public static Types =
    {
        Boolean : 'boolean',
        Number : 'number',
        Integer : 'integer',
        Float : 'float',
        Double : 'double',
        Long : 'bigint',
        Symbol : 'symbol',
        Object : 'object',
        Function : 'function',
        Array : 'array',
        Base64 : 'base64',
        Base64Array : 'base64array'
    }
}
