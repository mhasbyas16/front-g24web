export const management = [
    // ANGGARAN
    {_id: "0007", type: "menu", name : "Anggaran", icons: "dollar-bill", color : "warna-warni", componentId : "S30000", parentId: "", module: "ag"},
    {_id: "0007", type: "sub-menu", name : "Pengajuan Anggaran", icons: "", color : "warna-warni", componentId : "30001", parentId: "S30000", module: "ag",menu : {_id: "0007"}},
    {_id: "0007", type: "sub-menu", name : "Pergeseran Anggaran", icons: "", color : "warna-warni", componentId : "30002", parentId: "S30000", module: "ag",menu : {_id: "0007"}},
    // INVENTORY
    {_id: "0001", type: "menu", name : "Inventory Addition", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: "", module: "x1"},
    {_id: "0002",type: "sub-menu", name : "Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
    // LAPORAN
    {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
    {_id: "0004", type: "sub-menu", name : "Laporan Keuangan", icons: "yang bagus", color : "warna-warni", componentId : "21001", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
    // PARAMETER
    {_id: "0006", type: "menu", name : "Parameter Gallery", icons: "dashboard", color : "warna-warni", componentId : "S20000", parentId: "", module: "pr"},
    {_id: "0006", type: "sub-menu", name : "Parameter Harga", icons: "", color : "warna-warni", componentId : "20001", parentId: "S20000", module: "pr",menu : {_id: "0006"}},
    // PENJUALAN
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
    {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
    // SECURITY
    {_id: "0005", type: "menu", name : "Security", icons: "yang bagus", color : "warna-warni", componentId : "S10003", parentId: "", module: "rl"},
    {_id: "0005", type: "sub-menu", name : "Role", icons: "yang bagus", color : "warna-warni", componentId : "10002", parentId: "S10003", module: "rl",menu : {_id: "0005"}},
 ];

 export const kasir = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
    {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
    // LAPORAN
    {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
];
export const keuangan = [
    // ANGGARAN
    {_id: "0007", type: "menu", name : "Anggaran", icons: "dollar-bill", color : "warna-warni", componentId : "S30000", parentId: "", module: "ag"},
    {_id: "0007", type: "sub-menu", name : "Pengajuan Anggaran", icons: "", color : "warna-warni", componentId : "30001", parentId: "S30000", module: "ag",menu : {_id: "0007"}},
    {_id: "0007", type: "sub-menu", name : "Pergeseran Anggaran", icons: "", color : "warna-warni", componentId : "30002", parentId: "S30000", module: "ag",menu : {_id: "0007"}},
    // LAPORAN
    {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    {_id: "0004", type: "sub-menu", name : "Laporan Keuangan", icons: "yang bagus", color : "warna-warni", componentId : "21001", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
     // PARAMETER
     {_id: "0006", type: "menu", name : "Parameter Gallery", icons: "dashboard", color : "warna-warni", componentId : "S20000", parentId: "", module: "pr"},
     {_id: "0006", type: "sub-menu", name : "Parameter Global", icons: "", color : "warna-warni", componentId : "20002", parentId: "S20000", module: "pr",menu : {_id: "0006"}},
     {_id: "0006", type: "sub-menu", name : "Parameter Harga", icons: "", color : "warna-warni", componentId : "20001", parentId: "S20000", module: "pr",menu : {_id: "0006"}},
];

export const stock = [
    {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
];