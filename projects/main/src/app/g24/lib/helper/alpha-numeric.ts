export class AlphaNumeric {
    private static alnum =
    [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    public static GetAlphaNumeric() : string[]
    {
        return this.alnum;
    }

    public static Encode(number : number) : string
    {
        let enc : string = "";
        let n = 0;
        
        // looking for the highest Power
        while((number / Math.pow(this.alnum.length, n)) > 1.00000000000)
        {
            n++;
        }

        // console.log('n', n)
        
        // highest value is (n - 1)
        n--;

        for(; n >= 0; n--)
        {
            let currPower = Math.pow(this.alnum.length, n);
            let multiplier = number / currPower;
            multiplier = parseInt(multiplier.toString());

            let key : number = number - (currPower * multiplier);
            enc += this.alnum[multiplier];
            number -= (currPower * multiplier);
            console.debug("key", key, number)
        }

        return enc.toUpperCase();
    }

    public static Decode(string : string) : number
    {
        let len = string.length;
        string = string.toUpperCase();
        let num : number = 0;
        let char : string = "";

        for(let i = 0; i < string.length; i++)
        {
            len--;
            let mul = 0;
            char = string.charAt(i);
            for(let x = 0; x < this.alnum.length; x++)
            {
                if(char != this.alnum[x]) continue;

                mul = x;
                break;
            }
            num += parseInt(Math.pow(this.alnum.length, len).toString()) * mul;
            // console.log("num", num)
        }
        
        return num;
    }
}
