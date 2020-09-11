export const management = [
      {_id: "0001", type: "menu", name : "Inventory Addition", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: "", module: "x1"},
      {_id: "0002",type: "sub-menu", name : "Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
      {_id: "0002",type: "sub-menu", name : "Penerimaan", icons: "yang bagus", color : "warna-warni", componentId : "1005", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
      
      {_id: "0001", type: "menu", name : "Inventory Management", icons: "tasks", color : "warna-warni", componentId : "x2", parentId: "", module: "x2"},
      {_id: "0002",type: "sub-menu", name : "Mutasi", icons: "yang bagus", color : "warna-warni", componentId : "2001", parentId: "x2", module: "x2", menu : {_id: "0001"}},
      {_id: "0002",type: "sub-menu", name : "Approval Mutasi", icons: "yang bagus", color : "warna-warni", componentId : "2005", parentId: "x2", module: "x2", menu : {_id: "0001"}},
      {_id: "0002",type: "sub-menu", name : "Terima Mutasi", icons: "yang bagus", color : "warna-warni", componentId : "2004", parentId: "x2", module: "x2", menu : {_id: "0001"}},


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
      //PARAMETER PRODUCT
      {_id: "0007", type: "menu", name : "Paremeter Product", icons: "bundle", color : "warna-warni", componentId : "9191", parentId: "", module: "prp"},
      {_id: "0007", type: "sub-menu", name : "Paremeter Kategori", icons: "", color : "warna-warni", componentId : "9901", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Clarity", icons: "", color : "warna-warni", componentId : "9902", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Denom", icons: "", color : "warna-warni", componentId : "9903", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Diamond Color", icons: "", color : "warna-warni", componentId : "9904", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Gold Color", icons: "", color : "warna-warni", componentId : "9905", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Jenis", icons: "", color : "warna-warni", componentId : "9906", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Purity", icons: "", color : "warna-warni", componentId : "9907", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Paremeter Series", icons: "", color : "warna-warni", componentId : "9908", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Toko Penyedia", icons: "", color : "warna-warni", componentId : "9909", parentId: "9191", module: "prp",menu : {_id: "0007"}},
      {_id: "0007", type: "sub-menu", name : "Vendor", icons: "", color : "warna-warni", componentId : "9910", parentId: "9191", module: "prp",menu : {_id: "0007"}},
    
      // LAPORAN KEUANGAN
    //   {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S21000", parentId: "", module: "kl"},
      

 ];

 export const kasir = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
    {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
    // LAPORAN
    {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
];
export const keuangan = [
    
];

export const stock = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
];