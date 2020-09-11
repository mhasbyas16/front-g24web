export const management = [
      {_id: "0001", type: "menu", name : "Inventory Addition", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: "", module: "x1"},
      {_id: "0002",type: "sub-menu", name : "Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
      {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
      {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
      // LAPORAN
      {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
      {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
      {_id: "0004", type: "sub-menu", name : "Laporan Keuangan", icons: "yang bagus", color : "warna-warni", componentId : "21001", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
      // SECURITY
      {_id: "0005", type: "menu", name : "Security", icons: "yang bagus", color : "warna-warni", componentId : "S10003", parentId: "", module: "rl"},
      {_id: "0005", type: "sub-menu", name : "Role", icons: "yang bagus", color : "warna-warni", componentId : "10002", parentId: "S10003", module: "rl",menu : {_id: "0005"}},
      // PARAMETER
      {_id: "0006", type: "menu", name : "Paremeter Gallery", icons: "dashboard", color : "warna-warni", componentId : "S20000", parentId: "", module: "pr"},
      {_id: "0006", type: "sub-menu", name : "Paremeter", icons: "", color : "warna-warni", componentId : "20001", parentId: "S20000", module: "pr",menu : {_id: "0006"}},
      // LAPORAN KEUANGAN
    //   {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S21000", parentId: "", module: "kl"},

 ];

 export const kasir = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
    {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
    // LAPORAN
    {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
    //buyback
    {_id: "1001", type: "menu", name : "Buyback", icons: "coin-bag", color : "warna-warni", componentId : "S10011", parentId: "", module: "bb"},
    {_id: "1001", type: "sub-menu", name : "Terima Buyback", icons: "yang bagus", color : "warna-warni", componentId : "11001", parentId: "S10011", module: "bb",menu : {_id: "0001 "}},
    

];



export const keuangan = [
    
];

export const stock = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
];

export const kadetRetail = [
  // PROMOSI
  {_id: "0007", type: "menu", name : "Inisiasi Promo", icons: "bundle", color : "warna-warni", componentId : "S10004", parentId: "", module: "promo"},
  {_id: "0007", type: "sub-menu", name : "Pengaturan Promosi", icons: "", color : "warna-warni", componentId : "10004", parentId: "S10004", module: "promo",menu : {_id: "0007"}},
  {_id: "0007", type: "sub-menu", name : "Daftar Promosi", icons: "", color : "warna-warni", componentId : "10005", parentId: "S10004", module: "promo",menu : {_id: "0007"}},
];

export const staffRetail = [
  // PROMOSI
  {_id: "0007", type: "menu", name : "Inisiasi Promo", icons: "bundle", color : "warna-warni", componentId : "S10004", parentId: "", module: "promo"},
  {_id: "0007", type: "sub-menu", name : "Pengaturan Promosi", icons: "", color : "warna-warni", componentId : "10004", parentId: "S10004", module: "promo",menu : {_id: "0007"}},
  {_id: "0007", type: "sub-menu", name : "Daftar Promosi", icons: "", color : "warna-warni", componentId : "10005", parentId: "S10004", module: "promo",menu : {_id: "0007"}},
  
];