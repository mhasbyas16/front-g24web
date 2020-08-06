export const management = [
      {_id: "0001", type: "menu", name : "Inventory Addition", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: "", module: "x1"},
      {_id: "0002",type: "sub-menu", name : "Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
      {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
      {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
      // LAPORAN
      {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
      {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
      // SECURITY
      {_id: "0005", type: "menu", name : "Security", icons: "yang bagus", color : "warna-warni", componentId : "S10003", parentId: "", module: "rl"},
      {_id: "0005", type: "sub-menu", name : "Role", icons: "yang bagus", color : "warna-warni", componentId : "10002", parentId: "S10003", module: "rl",menu : {_id: "0005"}}
 ];

 export const kasir = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
    {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
    // LAPORAN
    {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
];