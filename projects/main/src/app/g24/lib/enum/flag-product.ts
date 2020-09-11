export class FlagProduct {
    public static VENDOR = {code : "vendor", name : "Ada di Vendor"}
    public static QC = {code : "qc", name : "Sedang di QC"}
    public static RETUR = {code : "retur", name : "Sedang Retur"}
    public static REFUND = {code : "refund", name : "Refund"}
    public static REKONDISI = {code: "rekondisi", name : "Sedang direkondisi"}
    public static STOCK = {code : "stock", name : "Ada di Gudang"}
    public static TRANSIT = {code : "transit", name : "Di Perjalanan Mutasi"}
    public static BOOKING = {code : "booking", name : "Sedang Booking"}
    public static SOLD = {code : "sale", name : "Sudah Terjual"}
    public static ISSUE = {code : "issue", name : "Barang bermasalah"}
}

export class LocationProduct {
    public static VENDOR = {code : "vendor", name : "Ada di Vendor"}
    public static PUSAT = {code : "pusat", name : "Ada di Pusat"}
    public static TRANSIT_UNIT = {code : "transit_unit", name : "Distribusi ke Unit Kerja"}
    public static UNIT = {code : "unit", name : "Ada di Unit Kerja"}
    public static TRANSIT_PROXY = {code : "transit_proxy", name : "Distribusi ke Kanwil/Proxy"}
    public static PROXY = {code : "proxy", name : "Ada di Kanwil/Proxy"}
    public static TRANSIT_CHANNEL = {code : "transit_channel", name : "Distribusi ke Channel"}
    public static CHANNEL = {code : "channel", name : "Ada di Channel"}
    public static TRANSIT_EXPEDISI = {code : "transit_expedisi", name : "Distribusi dengan jasa Expedisi"}
}

export class TipeStock {
    public static STOCK = {code : "stock", name : "Barang hasil pembelian ke Vendor"}
    public static PEMBUATAN = {code : "pembuatan", name : "Barang hasil pembuatan/perakitan dsm"}
    public static BUYBACK = {code : "buyback", name : "Barang hasil pembelian dari Customer"}
    public static KONSINYASI = {code : "konsinyasi", name : "Barang titipan"}
}
