
export class StringHelper {

    public static LeftZeroPad(num : string, size : number) : string
    {
        let s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    public static RightZeroPad(num : string, size : number) : string
    {
        let s = ""+num;
        while (s.length < size) s = s + "0";
        return s;
    }

    /**
     * 
     * @param delimiter to split `date` with
     * @param date to format
     * @param dateFormat the format of `date`
     * 
     * @returns `string` with a delimiter `-`
     * 
     * @example
     * 
     * `delimiter` = '/'
     * `date` = 08/15/2020 
     * `dateFormat` = MM/dd/yyyy 
     * `returns` = 2020-08-15
     */
    public static StandardFormatDate(delimiter : string, date : string, dateFormat : string) : string
    {
        let ret: string = "";

        let dateSplit = date.split(delimiter);
        let formatSplit = dateFormat.split(delimiter);

        let dd = "";
        let mm = "";
        let yyyy = "";
        let i = 0;
        for(let split in Object.values(formatSplit))
        {
            if(formatSplit[split] == "dd")
            {
                dd = dateSplit[i];
            }

            if(formatSplit[split] == "MM")
            {
                mm = dateSplit[i];
            }

            if(formatSplit[split] == "yyyy")
            {
                yyyy = dateSplit[i];
            }

            i++;
        }

        ret = yyyy +"-"+ mm + "-" + dd;

        return ret;
    }
}
