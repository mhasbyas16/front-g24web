/**
 * Please UPDATE this if you are adding a new Menu
 */
export enum EMenuID {
    /**
     * PROCUREMENT
     * 
     * Any process that adds to the Inventory
     */
    INISIASI            = '1001',
    APP_INISIASI        = '1002',
    ORDER               = '1003',
    BAYAR               = '1004',
    PENERIMAAN          = '1005',
    QC                  = '1006',
    APP_QC              = '1007',
    RETUR               = '1008',
    
    /**
     * MANAGEMENT
     * 
     * All about Internal Inventory Changes
     */
    MUTASI              = '2001',
    MUTASI_TE           = '2002', // need to Confirm
    MUTASI_BAKU         = '2003', // need to Confirm
    TERIMA_MUTASI       = '2004',
    APP_MUTASI          = '2005',
    
    /**
     * PROCESSING
     * 
     * Anything concerning about Materials and Extras
     */
    KONVERSI            = '3001', // Produk ke Bahan Baku
    APP_KONVERSI        = '3002',
    PEMBUATAN           = '3003', // Bahan Baku ke Produk
    APP_PEMBUATAN       = '3004',
    REKONDISI_PUSAT     = '3005',
    APP_REKONDISI_PUSAT = '3006',
    REKONDISI_DISTRO    = '3007',
    APP_REKONDISI_DISTRO= '3008',

    /**
     * DAILY-ORDER AND DISTRIBUTION
     * 
     * Daily orders from Channels and Marketplaces with it's Distribution
     */
    ORDER_CHANNEL_OFF   = '4001',
    PEMENUHAN_CHANNEL   = '4002',
    PEMENUHAN_MARKET    = '4003',
    DISTRIBUSI_CHANNEL  = '4004',
    DISTRIBUSI_MARKET   = '4005',

    /**
     * CHANNEL
     * 
     * 
     */
    TRX_TE              = '5001',

    /**
     * ISSUE
     * 
     * Handles about Inventory related problems
     */
    ISSUE               = '6001',


    /**
     * MASTER COLLECTION PAGE
     * 
     * Starts from 9000
     */
    MASTER_INIT         = '9000',
    MASTER_STOCK        = '9001',
    MASTER_STOCK_TE     = '9002',
    MASTER_STOCK_BAKU   = '9003',
    MASTER_MUTASI       = '9004',
    MASTER_KONVERSI     = '9005',
    MASTER_REKONDISI    = '9006',
    MASTER_ORDER_CHANNEL= '9007',
    MASTER_ORDER_MARKET = '9008',
    MASTER_ISSUE        = '9009',
    MASTER_PRODUCT      = '9010',
    MASTER_ATTRIBUTE    = '9011',
    MASTER_NON_EMAS     = '9012',
    MASTER_CHANNELS     = '9013',
    MASTER_MARKETS      = '9014',
    MASTER_SKU          = '9015',

    /**
     * SYSTEM
     * 
     * Starts from 9900
     */
    SYSTEM_PARAM        = '9900',
    
    PARAM_KATEGORI      = '9901',
    PARAM_CLARITY       = '9902',
    PARAM_DENOM         = '9903',
    PARAM_DIAMOND_COLOR  = '9904',
    PARAM_GOLD_COLOR    = '9905',
    PARAM_JENIS         = '9906',
    PARAM_PURITY        = '9907',
    PARAM_SERIES        = '9908',

    // Offline Sale
    DISTRO              = '10001',
    ROLE                = '10002',
    LAPORAN             = '10003',
    KORPORASI           = '10004',
    LAPORAN_BUYBACK     = '10009',
    // promosi
    PENGATURAN_PROMO = '10004',
    DAFTAR_PROMO = '10005',
    // offline buyback
    BUYBACK             = '11001',
    PARAMETER_BUYBACK   = '11002',
    BUYBACKMANUAL   = '11003',
    PARAMETER_ACCEPT_BUYBACK = '11004',

    // LAPORAN KEUANGAN
    LAPORAN_KEUANGAN = '21000',
    REKENING_KORAN = '21001',

    //parameter
    PARAMETER             = '20000',
    PRM_GALLERY         = '20001',
 }
