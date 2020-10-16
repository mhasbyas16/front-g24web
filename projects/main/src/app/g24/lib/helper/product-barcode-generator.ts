export class ProductBarcodeGenerator {
    public generatePerhiasan(product : any) : string
    {
        let category = product['product-category'];
        let vendor = product['vendor'];
        let purity = product['product-purity'];
        let jenis = product['product-jenis'];
        let gColor = product['product-gold-color'];
        let seq = product['no_urut'];

        if(!category || !vendor || !purity || !jenis || !gColor || !seq)
        {
            alert("Beberapa atribut Perhiasan kosong.");
            return null;
        }

        let code = "" + category.code + vendor.code + purity.name + jenis.code + gColor + seq;

        return code;
    }

    public generateSouvenir(product : any) : string
    {
        let category = product['product-category'];
        let vendor = product['vendor'];
        let denom = product['product-denom'];
        let series = product['product-series'];
        let seq = product['no_urut'];
        
        if(!category || !vendor || !denom || !series || !seq)
        {
            alert("Beberapa atribut Perhiasan kosong.");
            return null;
        }

        let code = "" + category.code + vendor.code + denom.code + series.code + seq;

        return code;
    }
    
    public generateGift(product : any) : string
    {
        let category = product['product-category'];
        let vendor = product['vendor'];
        let denom = product['product-denom'];
        let series = product['product-series'];
        let seq = product['no_urut'];
        
        if(!category || !vendor || !denom || !series || !seq)
        {
            alert("Beberapa atribut Perhiasan kosong.");
            return null;
        }

        let code = "" + category.code + vendor.code + denom.code + series.code + seq;

        return code;
    }
    
    public generateDinar(product : any) : string
    {
        let category = product['product-category'];
        let vendor = product['vendor'];
        let denom = product['product-denom'];
        let seq = product['no_urut'];
        
        if(!category || !vendor || !denom || !seq)
        {
            alert("Beberapa atribut Perhiasan kosong.");
            return null;
        }

        let code = "" + category.code + vendor.code + denom.code + seq;

        return code;
    }
    
    public generateEmas(product : any) : string
    {
        let category = product['product-category'];
        let vendor = product['vendor'];
        let denom = product['product-denom'];
        let seq = product['no_urut'];
        
        if(!category || !vendor || !denom || !seq)
        {
            alert("Beberapa atribut Perhiasan kosong.");
            return null;
        }

        let code = "" + category.code + vendor.code + denom.code + seq;

        return code;
    }

    public generatePermata(product : any) : string
    {
        let category = product['product-category'];
        let vendor = product['vendor'];
        let purity = product['product-purity'];
        let jenis = product['product-jenis'];
        let gColor = product['product-gold-color'];
        let seq = product['no_urut'];

        if(!category || !vendor || !purity || !jenis || !gColor || !seq)
        {
            alert("Beberapa atribut Perhiasan kosong.");
            return null;
        }

        let code = "" + category.code + vendor.code + purity.name + jenis.code + gColor + seq;

        return code;
    }
}
