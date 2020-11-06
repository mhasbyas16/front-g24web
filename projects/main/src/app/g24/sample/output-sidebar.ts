import { EMenuID } from '../lib/enums/emenu-id.enum';
export const management = [
  // ADMIN
  { _id: "0013", type: "menu", name: "Admin", icons: "user", color: "warna-warni", componentId: "S1100", parentId: "", module: "adm" },
  { _id: "0013", type: "sub-menu", name: "Manajemen Cabang", icons: "yang bagus", color: "warna-warni", componentId: "1102", parentId: "S1100", module: "adm", menu: { _id: "0013" } },
  { _id: "0013", type: "sub-menu", name: "Manajemen Padanan Distro", icons: "yang bagus", color: "warna-warni", componentId: "1103", parentId: "S1100", module: "adm", menu: { _id: "0013" } },
  { _id: "0013", type: "sub-menu", name: "Manajemen Unit", icons: "yang bagus", color: "warna-warni", componentId: "1101", parentId: "S1100", module: "adm", menu: { _id: "0013" } },
  // INVENTORY
  { _id: "0001", type: "menu", name: "Inventory Addition", icons: "yang bagus", color: "warna-warni", componentId: "x1001", parentId: "", module: "x1" },
  { _id: "0002", type: "sub-menu", name: "Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: "1001", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Approval Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: "1002", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Penerimaan", icons: "yang bagus", color: "warna-warni", componentId: "1005", parentId: "x1001", module: "x1", menu: { _id: "0001" } },

  { _id: "0001", type: "menu", name: "Inventory Management", icons: "yang bagus", color: "warna-warni", componentId: "x2", parentId: "", module: "x2" },
  { _id: "0002", type: "sub-menu", name: "Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2001", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Approval Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2005", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Terima Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2004", parentId: "x2", module: "x2", menu: { _id: "0001" } },


  { _id: "0003", type: "menu", name: "Penjualan", icons: "shopping-cart", color: "warna-warni", componentId: "S10001", parentId: "", module: "pj" },
  { _id: "0003", type: "sub-menu", name: "Penjualan Distro", icons: "yang bagus", color: "warna-warni", componentId: "10001", parentId: "S10001", module: "pj", menu: { _id: "0003" } },
  // korporasi
  { _id: "0008", type: "menu", name: "Penjualan Korporasi", icons: "shopping-cart", color: "warna-warni", componentId: "S10022", parentId: "", module: "pjk" },
  { _id: "0008", type: "sub-menu", name: "Penjualan Korporasi", icons: "yang bagus", color: "warna-warni", componentId: "13001", parentId: "S10022", module: "pjk", menu: { _id: "0008" } },
  { _id: "0008", type: "sub-menu", name: "Penjualan Berjangka", icons: "yang bagus", color: "warna-warni", componentId: "", parentId: "S10022", module: "pjk", menu: { _id: "0008" } },
  { _id: "0008", type: "sub-menu", name: "List Penjualan Korporasi", icons: "yang bagus", color: "warna-warni", componentId: "13002", parentId: "S10022", module: "pjk", menu: { _id: "0008" } },

  // LAPORAN
  { _id: "0004", type: "menu", name: "Laporan", icons: "list", color: "warna-warni", componentId: "S10002", parentId: "", module: "lp" },
  { _id: "0004", type: "sub-menu", name: "Laporan Penjualan", icons: "yang bagus", color: "warna-warni", componentId: "10003", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  { _id: "0004", type: "sub-menu", name: "Rekening Koran", icons: "yang bagus", color: "warna-warni", componentId: "21001", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  // SECURITY
  { _id: "0005", type: "menu", name: "Security", icons: "yang bagus", color: "warna-warni", componentId: "S10003", parentId: "", module: "rl" },
  { _id: "0005", type: "sub-menu", name: "Role", icons: "yang bagus", color: "warna-warni", componentId: "10002", parentId: "S10003", module: "rl", menu: { _id: "0005" } },
  // PARAMETER
  { _id: "0006", type: "menu", name: "Paremeter Gallery", icons: "dashboard", color: "warna-warni", componentId: "S20000", parentId: "", module: "pr" },
  { _id: "0006", type: "sub-menu", name: "Paremeter", icons: "", color: "warna-warni", componentId: "20001", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
  //INISIASI BAHAN BAKU
  { _id: "0010", type: "menu", name: "Bahan Baku", icons: "layers", color: "warna-warni", componentId: "x1003", parentId: "", module: "x3" },
  { _id: "0010", type: "sub-menu", name: "Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: EMenuID.PEMBUATAN, parentId: "x1003", module: "x3", menu: { _id: "0002" } },
  { _id: "0010", type: "sub-menu", name: "Approval", icons: "yang bagus", color: "warna-warni", componentId: EMenuID.APP_PEMBUATAN, parentId: "x1003", module: "x3", menu: { _id: "0002" } },
  // PARAMETER PRODUCT
  { _id: "0009", type: "menu", name: "Parameter Product", icons: "blocks-group", color: "warna-warni", componentId: "P1001", parentId: "", module: "prp" },
  { _id: "0009", type: "sub-menu", name: "Param Kategori", icons: "", color: "warna-warni", componentId: "9901", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Clarity", icons: "", color: "warna-warni", componentId: "9902", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Denom", icons: "", color: "warna-warni", componentId: "9903", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Diamond Color", icons: "", color: "warna-warni", componentId: "9904", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Gold Color", icons: "", color: "warna-warni", componentId: "9905", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Jenis", icons: "", color: "warna-warni", componentId: "9906", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Purity", icons: "", color: "warna-warni", componentId: "9907", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Series", icons: "", color: "warna-warni", componentId: "9908", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Toko Penyedia", icons: "", color: "warna-warni", componentId: "9909", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Vendor", icons: "", color: "warna-warni", componentId: "9910", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  // ANGGARAN
  { _id: "0007", type: "menu", name: "Anggaran", icons: "dollar-bill", color: "warna-warni", componentId: "S30000", parentId: "", module: "ag" },
  { _id: "0007", type: "sub-menu", name: "Pengajuan Anggaran", icons: "", color: "warna-warni", componentId: "30001", parentId: "S30000", module: "ag", menu: { _id: "0007" } },
  { _id: "0007", type: "sub-menu", name: "Pergeseran Anggaran", icons: "", color: "warna-warni", componentId: "30002", parentId: "S30000", module: "ag", menu: { _id: "0007" } },
  //INQUERY PRODUCT
  { _id: "0011", type: "menu", name: "Inquery", icons: "data-cluster", color: "warna-warni", componentId: "IP101", parentId: "", module: "ip" },
  { _id: "0011", type: "sub-menu", name: "Inquery Product", icons: "yang bagus", color: "warna-warni", componentId: "99101", parentId: "IP101", module: "ip", menu: { _id: "0011" } },
  //KONVERSI
  { _id: "0012", type: "menu", name: "Konversi Product", icons: "organization", color: "warna-warni", componentId: "KV101", parentId: "", module: "kv" },
  { _id: "0012", type: "sub-menu", name: "Konversi", icons: "yang bagus", color: "warna-warni", componentId: "3001", parentId: "KV101", module: "kv", menu: { _id: "0012" } },
  { _id: "0012", type: "sub-menu", name: "Approval Konversi", icons: "yang bagus", color: "warna-warni", componentId: "3002", parentId: "KV101", module: "kv", menu: { _id: "0012" } },
  // LAPORAN KEUANGAN
  //   {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S21000", parentId: "", module: "kl"},
  
  // AUDIT
  { _id: "0012", type: "menu", name: "Audit", icons: "yang bagus", color: "warna-warni", componentId: "A111001", parentId: "KV101", module: "audit", menu: { _id: "0012" } },
  { _id: "0012", type: "sub-menu", name: "Audit Logs", icons: "yang bagus", color: "warna-warni", componentId: "111001", parentId: "A111001", module: "audit", menu: { _id: "0012" } },
];

export const kasir = [
  { _id: "0003", type: "menu", name: "Penjualan", icons: "shopping-cart", color: "warna-warni", componentId: "S10001", parentId: "", module: "pj" },
  { _id: "0003", type: "sub-menu", name: "Penjualan Distro", icons: "yang bagus", color: "warna-warni", componentId: "10001", parentId: "S10001", module: "pj", menu: { _id: "0003" } },
  // LAPORAN
  { _id: "0004", type: "menu", name: "Laporan", icons: "list", color: "warna-warni", componentId: "S10002", parentId: "", module: "lp" },
  { _id: "0004", type: "sub-menu", name: "Laporan Penjualan", icons: "yang bagus", color: "warna-warni", componentId: "10003", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  { _id: "0004", type: "sub-menu", name: "Laporan Buyback", icons: "yang bagus", color: "warna-warni", componentId: "10009", parentId: "S10002", module: "lp", menu: { _id: "0005" } },
  { _id: "0004", type: "sub-menu", name: "Laporan BB Manual", icons: "yang bagus", color: "warna-warni", componentId: "10010", parentId: "S10002", module: "lp", menu: { _id: "0005" } },
  { _id: "0004", type: "sub-menu", name: "Rekening Koran", icons: "yang bagus", color: "warna-warni", componentId: "21001", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  //buyback
  { _id: "1001", type: "menu", name: "Buyback", icons: "coin-bag", color: "warna-warni", componentId: "S10011", parentId: "", module: "bb" },
  { _id: "1001", type: "sub-menu", name: "Terima Buyback", icons: "yang bagus", color: "warna-warni", componentId: "11001", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  { _id: "1001", type: "sub-menu", name: "Terima LM Non-Pegadaian", icons: "yang bagus", color: "warna-warni", componentId: "11003", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  { _id: "1001", type: "sub-menu", name: "Terima Manual Perhiasan", icons: "yang bagus", color: "warna-warni", componentId: "11006", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  { _id: "1001", type: "sub-menu", name: "Terima Manual Souvenir", icons: "yang bagus", color: "warna-warni", componentId: "11005", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  // TRANSAKSI-MOKER
  { _id: "0006", type: "menu", name: "Transaksi", icons: "nvme", color: "warna-warni", componentId: "S31000", parentId: "", module: "tm" },
  { _id: "0006", type: "sub-menu", name: "Kirim Moker", icons: "", color: "warna-warni", componentId: "31001", parentId: "S31000", module: "tm", menu: { _id: "0008" } },
  { _id: "0006", type: "sub-menu", name: "Terima Moker", icons: "", color: "warna-warni", componentId: "31003", parentId: "S31000", module: "tm", menu: { _id: "0008" } },

  //INQUERY PRODUCT
  { _id: "0011", type: "menu", name: "Inquery", icons: "data-cluster", color: "warna-warni", componentId: "IP101", parentId: "", module: "ip" },
  { _id: "0011", type: "sub-menu", name: "Inquery Product", icons: "yang bagus", color: "warna-warni", componentId: "99101", parentId: "IP101", module: "ip", menu: { _id: "0011" } },
];
export const managerDistro = [

  // LAPORAN
  { _id: "0004", type: "menu", name: "Laporan", icons: "list", color: "warna-warni", componentId: "S10002", parentId: "", module: "lp" },
  { _id: "0004", type: "sub-menu", name: "Laporan Penjualan", icons: "yang bagus", color: "warna-warni", componentId: "10003", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  { _id: "0004", type: "sub-menu", name: "Laporan Buyback", icons: "yang bagus", color: "warna-warni", componentId: "10009", parentId: "S10002", module: "lp", menu: { _id: "0005" } },
  { _id: "0004", type: "sub-menu", name: "Laporan BB Manual", icons: "yang bagus", color: "warna-warni", componentId: "10010", parentId: "S10002", module: "lp", menu: { _id: "0005" } },
  { _id: "0004", type: "sub-menu", name: "Rekening Koran", icons: "yang bagus", color: "warna-warni", componentId: "21001", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  // Mutasi
  { _id: "0001", type: "menu", name: "Inventory Management", icons: "yang bagus", color: "warna-warni", componentId: "x2", parentId: "", module: "x2" },
  { _id: "0002", type: "sub-menu", name: "Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2001", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  // {_id: "0002",type: "sub-menu", name : "Approval Mutasi", icons: "yang bagus", color : "warna-warni", componentId : "2005", parentId: "x2", module: "x2", menu : {_id: "0001"}},
  { _id: "0002", type: "sub-menu", name: "Terima Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2004", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  //INQUERY PRODUCT
  { _id: "0011", type: "menu", name: "Inquery", icons: "data-cluster", color: "warna-warni", componentId: "IP101", parentId: "", module: "ip" },
  { _id: "0011", type: "sub-menu", name: "Inquery Product", icons: "yang bagus", color: "warna-warni", componentId: "99101", parentId: "IP101", module: "ip", menu: { _id: "0011" } },
  // TRANSAKSI-MOKER
  { _id: "0006", type: "menu", name: "Transaksi", icons: "nvme", color: "warna-warni", componentId: "S31000", parentId: "", module: "tm" },
  { _id: "0006", type: "sub-menu", name: "Approval Kirim Modal", icons: "", color: "warna-warni", componentId: "31002", parentId: "S31000", module: "tm", menu: { _id: "0008" } },
  { _id: "0006", type: "sub-menu", name: "Approval Terima Moker", icons: "", color: "warna-warni", componentId: "31004", parentId: "S31000", module: "tm", menu: { _id: "0008" } },


];

export const keuangan = [
  // ANGGARAN
  { _id: "0007", type: "menu", name: "Anggaran", icons: "dollar-bill", color: "warna-warni", componentId: "S30000", parentId: "", module: "ag" },
  { _id: "0007", type: "sub-menu", name: "Pengajuan Anggaran", icons: "", color: "warna-warni", componentId: "30001", parentId: "S30000", module: "ag", menu: { _id: "0007" } },
  { _id: "0007", type: "sub-menu", name: "Pergeseran Anggaran", icons: "", color: "warna-warni", componentId: "30002", parentId: "S30000", module: "ag", menu: { _id: "0007" } },
  // LAPORAN
  { _id: "0004", type: "menu", name: "Laporan", icons: "list", color: "warna-warni", componentId: "S10002", parentId: "", module: "lp" },
  { _id: "0004", type: "sub-menu", name: "Rekening Koran", icons: "yang bagus", color: "warna-warni", componentId: "21001", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  // PARAMETER
  { _id: "0006", type: "menu", name: "Parameter Gallery", icons: "dashboard", color: "warna-warni", componentId: "S20000", parentId: "", module: "pr" },
  { _id: "0006", type: "sub-menu", name: "Parameter Global", icons: "", color: "warna-warni", componentId: "20002", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
  { _id: "0006", type: "sub-menu", name: "Parameter Harga", icons: "", color: "warna-warni", componentId: "20001", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
  // TRANSAKSI-MOKER
  { _id: "0006", type: "menu", name: "Transaksi", icons: "nvme", color: "warna-warni", componentId: "S31000", parentId: "", module: "tm" },
  { _id: "0006", type: "sub-menu", name: "Kirim Moker", icons: "", color: "warna-warni", componentId: "31001", parentId: "S31000", module: "tm", menu: { _id: "0008" } },
  { _id: "0006", type: "sub-menu", name: "Terima Moker", icons: "", color: "warna-warni", componentId: "31003", parentId: "S31000", module: "tm", menu: { _id: "0008" } },
];

export const stock = [
  { _id: "0003", type: "menu", name: "Penjualan", icons: "shopping-cart", color: "warna-warni", componentId: "S10001", parentId: "", module: "pj" },
];

export const kadetRetail = [
  // PROMOSI
  { _id: "0007", type: "menu", name: "Inisiasi Promo", icons: "bundle", color: "warna-warni", componentId: "S10004", parentId: "", module: "promo" },
  { _id: "0007", type: "sub-menu", name: "Pengaturan Promosi", icons: "", color: "warna-warni", componentId: "10004", parentId: "S10004", module: "promo", menu: { _id: "0007" } },
  { _id: "0007", type: "sub-menu", name: "Daftar Promosi", icons: "", color: "warna-warni", componentId: "10005", parentId: "S10004", module: "promo", menu: { _id: "0007" } },
  //buyback
  { _id: "1001", type: "menu", name: "Buyback", icons: "coin-bag", color: "warna-warni", componentId: "S10011", parentId: "", module: "bb" },
  { _id: "1001", type: "sub-menu", name: "Terima Buyback", icons: "yang bagus", color: "warna-warni", componentId: "11001", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  { _id: "1001", type: "sub-menu", name: "Parameter Buyback", icons: "yang bagus", color: "warna-warni", componentId: "11002", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  { _id: "1001", type: "sub-menu", name: "Parameter Accept Buyback", icons: "yang bagus", color: "warna-warni", componentId: "11004", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
];

export const staffRetail = [
  // PROMOSI
  { _id: "0007", type: "menu", name: "Inisiasi Promo", icons: "bundle", color: "warna-warni", componentId: "S10004", parentId: "", module: "promo" },
  { _id: "0007", type: "sub-menu", name: "Pengaturan Promosi", icons: "", color: "warna-warni", componentId: "10004", parentId: "S10004", module: "promo", menu: { _id: "0007" } },
  { _id: "0007", type: "sub-menu", name: "Daftar Promosi", icons: "", color: "warna-warni", componentId: "10005", parentId: "S10004", module: "promo", menu: { _id: "0007" } },
  //buyback
  { _id: "1001", type: "menu", name: "Buyback", icons: "coin-bag", color: "warna-warni", componentId: "S10011", parentId: "", module: "bb" },
  { _id: "1001", type: "sub-menu", name: "Terima Buyback", icons: "yang bagus", color: "warna-warni", componentId: "11001", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
  { _id: "1001", type: "sub-menu", name: "Parameter Buyback", icons: "yang bagus", color: "warna-warni", componentId: "11002", parentId: "S10011", module: "bb", menu: { _id: "0001 " } },
];

export const staffStock = [
  // INVENTORY
  { _id: "0001", type: "menu", name: "Inventory Addition", icons: "yang bagus", color: "warna-warni", componentId: "x1001", parentId: "", module: "x1" },
  { _id: "0002", type: "sub-menu", name: "Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: "1001", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  // {_id: "0002",type: "sub-menu", name : "Approval Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1002", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
  { _id: "0002", type: "sub-menu", name: "Penerimaan", icons: "yang bagus", color: "warna-warni", componentId: "1005", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  // Mutasi
  { _id: "0001", type: "menu", name: "Inventory Management", icons: "yang bagus", color: "warna-warni", componentId: "x2", parentId: "", module: "x2" },
  { _id: "0002", type: "sub-menu", name: "Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2001", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  // {_id: "0002",type: "sub-menu", name : "Approval Mutasi", icons: "yang bagus", color : "warna-warni", componentId : "2005", parentId: "x2", module: "x2", menu : {_id: "0001"}},
  { _id: "0002", type: "sub-menu", name: "Terima Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2004", parentId: "x2", module: "x2", menu: { _id: "0001" } },

  //INQUERY PRODUCT
  { _id: "0011", type: "menu", name: "Inquery", icons: "data-cluster", color: "warna-warni", componentId: "IP101", parentId: "", module: "ip" },
  { _id: "0011", type: "sub-menu", name: "Inquery Product", icons: "yang bagus", color: "warna-warni", componentId: "99101", parentId: "IP101", module: "ip", menu: { _id: "0011" } },

  // Laporan
  // {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
  // {_id: "0004", type: "sub-menu", name : "Laporan Keuangan", icons: "yang bagus", color : "warna-warni", componentId : "21001", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
]

export const staffPurchasing = [
  // INVENTORY
  { _id: "0001", type: "menu", name: "Inventory Addition", icons: "yang bagus", color: "warna-warni", componentId: "x1001", parentId: "", module: "x1" },
  { _id: "0002", type: "sub-menu", name: "Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: "1001", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  // {_id: "0002",type: "sub-menu", name : "Approval Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1002", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
  { _id: "0002", type: "sub-menu", name: "Penerimaan", icons: "yang bagus", color: "warna-warni", componentId: "1005", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  // Laporan
  { _id: "0004", type: "menu", name: "Laporan", icons: "list", color: "warna-warni", componentId: "S10002", parentId: "", module: "lp" },
  { _id: "0004", type: "sub-menu", name: "Rekening Koran", icons: "yang bagus", color: "warna-warni", componentId: "21001", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  // PARAMETER
  { _id: "0006", type: "menu", name: "Parameter Gallery", icons: "dashboard", color: "warna-warni", componentId: "S20000", parentId: "", module: "pr" },
  { _id: "0006", type: "sub-menu", name: "Parameter Global", icons: "", color: "warna-warni", componentId: "20002", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
  { _id: "0006", type: "sub-menu", name: "Parameter Harga", icons: "", color: "warna-warni", componentId: "20001", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
]

export const kadepStock = [
  // INVENTORY
  { _id: "0001", type: "menu", name: "Inventory Addition", icons: "yang bagus", color: "warna-warni", componentId: "x1001", parentId: "", module: "x1" },
  { _id: "0002", type: "sub-menu", name: "Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: "1001", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Approval Inisiasi", icons: "yang bagus", color: "warna-warni", componentId: "1002", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Penerimaan", icons: "yang bagus", color: "warna-warni", componentId: "1005", parentId: "x1001", module: "x1", menu: { _id: "0001" } },
  // Mutasi
  { _id: "0001", type: "menu", name: "Inventory Management", icons: "yang bagus", color: "warna-warni", componentId: "x2", parentId: "", module: "x2" },
  { _id: "0002", type: "sub-menu", name: "Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2001", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Approval Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2005", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  { _id: "0002", type: "sub-menu", name: "Terima Mutasi", icons: "yang bagus", color: "warna-warni", componentId: "2004", parentId: "x2", module: "x2", menu: { _id: "0001" } },
  // Laporan
  { _id: "0004", type: "menu", name: "Laporan", icons: "list", color: "warna-warni", componentId: "S10002", parentId: "", module: "lp" },
  { _id: "0004", type: "sub-menu", name: "Rekening Koran", icons: "yang bagus", color: "warna-warni", componentId: "21001", parentId: "S10002", module: "lp", menu: { _id: "0004" } },
  // PARAMETER
  { _id: "0006", type: "menu", name: "Parameter Gallery", icons: "dashboard", color: "warna-warni", componentId: "S20000", parentId: "", module: "pr" },
  { _id: "0006", type: "sub-menu", name: "Parameter Global", icons: "", color: "warna-warni", componentId: "20002", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
  { _id: "0006", type: "sub-menu", name: "Parameter Harga", icons: "", color: "warna-warni", componentId: "20001", parentId: "S20000", module: "pr", menu: { _id: "0006" } },
  // PARAMETER PRODUCT
  { _id: "0009", type: "menu", name: "Parameter Product", icons: "blocks-group", color: "warna-warni", componentId: "P1001", parentId: "", module: "prp" },
  { _id: "0009", type: "sub-menu", name: "Param Kategori", icons: "", color: "warna-warni", componentId: "9901", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Clarity", icons: "", color: "warna-warni", componentId: "9902", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Denom", icons: "", color: "warna-warni", componentId: "9903", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Diamond Color", icons: "", color: "warna-warni", componentId: "9904", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Gold Color", icons: "", color: "warna-warni", componentId: "9905", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Jenis", icons: "", color: "warna-warni", componentId: "9906", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Purity", icons: "", color: "warna-warni", componentId: "9907", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Param Series", icons: "", color: "warna-warni", componentId: "9908", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Toko Penyedia", icons: "", color: "warna-warni", componentId: "9909", parentId: "P1001", module: "prp", menu: { _id: "0009" } },
  { _id: "0009", type: "sub-menu", name: "Vendor", icons: "", color: "warna-warni", componentId: "9910", parentId: "P1001", module: "prp", menu: { _id: "0009" } },

  //INQUERY PRODUCT
  { _id: "0011", type: "menu", name: "Inquery", icons: "data-cluster", color: "warna-warni", componentId: "IP101", parentId: "", module: "ip" },
  { _id: "0011", type: "sub-menu", name: "Inquery Product", icons: "yang bagus", color: "warna-warni", componentId: "99101", parentId: "IP101", module: "ip", menu: { _id: "0011" } },
]
