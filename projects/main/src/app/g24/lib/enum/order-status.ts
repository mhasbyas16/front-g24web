export class OrderStatus { // di collection 'inisiasi' = order_status
    public static DRAFT = {code : "draft", name : "Draft"}
    public static SUBMIT = {code : "submit", name : "Belum Terima"}
    public static APPROVAL = {code : "approve", name : "Sudah Di Approval/Belum Terima"}
    public static TOLAK = {code : "tolak", name : "Di Tolak"}
    public static DELETE = {code : "delete", name : "Invalid"}
    public static VENDOR = {code : "vendor", name : "Ada di Vendor"}
    public static TERIMA_PARTIAL = {code : "terima_partial", name : "Diterima sebagian"}
    public static TERIMA_FULL = {code : "terima_full", name : "Diterima Full"}
    public static PUSAT = {code : "pusat", name : "Ada di Pusat"}
    public static TRANSIT_UNIT = {code : "transit_unit", name : "Distribusi ke Unit Kerja"}
    public static UNIT = {code : "unit", name : "Ada di Unit Kerja"}
    public static TRANSIT_PROXY = {code : "transit_proxy", name : "Distribusi ke Kanwil/Proxy"}
    public static PROXY = {code : "proxy", name : "Ada di Kanwil/Proxy"}
    public static TRANSIT_CHANNEL = {code : "transit_channel", name : "Distribusi ke Channel"}
    public static CHANNEL = {code : "channel", name : "Ada di Channel"}
    public static TRANSIT_EXPEDISI = {code : "transit_expedisi", name : "Distribusi dengan jasa Expedisi"}
}
