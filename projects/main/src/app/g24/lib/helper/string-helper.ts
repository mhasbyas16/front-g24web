
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
}
