"use strict";
exports.__esModule = true;
exports.EMenuID = void 0;
/**
 * Please UPDATE this if you are adding a new Menu
 */
var EMenuID;
(function (EMenuID) {
    /**
     * PROCUREMENT
     *
     * Any process that adds to the Inventory
     */
    EMenuID["INISIASI"] = "1001";
    EMenuID["APP_INISIASI"] = "1002";
    EMenuID["ORDER"] = "1003";
    EMenuID["BAYAR"] = "1004";
    EMenuID["PENERIMAAN"] = "1005";
    EMenuID["QC"] = "1006";
    EMenuID["APP_QC"] = "1007";
    EMenuID["RETUR"] = "1008";
    /**
     * MANAGEMENT
     *
     * All about Internal Inventory Changes
     */
    EMenuID["MUTASI"] = "2001";
    EMenuID["MUTASI_TE"] = "2002";
    EMenuID["MUTASI_BAKU"] = "2003";
    EMenuID["TERIMA"] = "2004";
    /**
     * PROCESSING
     *
     * Anything concerning about Materials and Extras
     */
    EMenuID["KONVERSI"] = "3001";
    EMenuID["APP_KONVERSI"] = "3002";
    EMenuID["PEMBUATAN"] = "3003";
    EMenuID["APP_PEMBUATAN"] = "3004";
    EMenuID["REKONDISI_PUSAT"] = "3005";
    EMenuID["APP_REKONDISI_PUSAT"] = "3006";
    EMenuID["REKONDISI_DISTRO"] = "3007";
    EMenuID["APP_REKONDISI_DISTRO"] = "3008";
    /**
     * DAILY-ORDER AND DISTRIBUTION
     *
     * Daily orders from Channels and Marketplaces with it's Distribution
     */
    EMenuID["ORDER_CHANNEL_OFF"] = "4001";
    EMenuID["PEMENUHAN_CHANNEL"] = "4002";
    EMenuID["PEMENUHAN_MARKET"] = "4003";
    EMenuID["DISTRIBUSI_CHANNEL"] = "4004";
    EMenuID["DISTRIBUSI_MARKET"] = "4005";
    /**
     * CHANNEL
     *
     *
     */
    EMenuID["TRX_TE"] = "5001";
    /**
     * ISSUE
     *
     * Handles about Inventory related problems
     */
    EMenuID["ISSUE"] = "6001";
    /**
     * MASTER COLLECTION PAGE
     *
     * Starts from 9000
     */
    EMenuID["MASTER_INIT"] = "9000";
    EMenuID["MASTER_STOCK"] = "9001";
    EMenuID["MASTER_STOCK_TE"] = "9002";
    EMenuID["MASTER_STOCK_BAKU"] = "9003";
    EMenuID["MASTER_MUTASI"] = "9004";
    EMenuID["MASTER_KONVERSI"] = "9005";
    EMenuID["MASTER_REKONDISI"] = "9006";
    EMenuID["MASTER_ORDER_CHANNEL"] = "9007";
    EMenuID["MASTER_ORDER_MARKET"] = "9008";
    EMenuID["MASTER_ISSUE"] = "9009";
    EMenuID["MASTER_PRODUCT"] = "9010";
    EMenuID["MASTER_ATTRIBUTE"] = "9011";
    EMenuID["MASTER_NON_EMAS"] = "9012";
    EMenuID["MASTER_CHANNELS"] = "9013";
    EMenuID["MASTER_MARKETS"] = "9014";
    EMenuID["MASTER_SKU"] = "9015";
    /**
     * SYSTEM
     *
     * Starts from 9900
     */
    EMenuID["SYSTEM_PARAM"] = "9900";
    // penjualan
    EMenuID["DISTRO"] = "10001";
    EMenuID["ROLE"] = "10002";
    EMenuID["LAPORAN"] = "10003";
    // promosi
    EMenuID["PENGATURAN_PROMO"] = "10004";
    // LAPORAN KEUANGAN
    EMenuID["LAPORAN_KEUANGAN"] = "21000";
    EMenuID["REKENING_KORAN"] = "21001";
    //parameter
    EMenuID["PARAMETER"] = "20000";
    EMenuID["PRM_GALLERY"] = "20001";
})(EMenuID = exports.EMenuID || (exports.EMenuID = {}));
