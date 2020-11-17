import { Injectable } from "@angular/core";
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from "../../sample/cart-buyback";

// service
import { TransactionService } from "./transaction.service";
import { VendorService } from "../vendor.service";
import { ProductService } from "../product/product.service";
@Injectable({
  providedIn: "root",
})
export class TransactionFlagBuybackService {
  constructor(
    private transactionService: TransactionService,
    private vendorService: VendorService,
    private productService:ProductService
  ) {}

  // batchUpdate(_unit) {
  //   let perhiasan = {};
  //   let lm = {};
  //   let no = 0;
  //   let gs = {};
  //   let berlian = {};
  //   let dinar = {};
  //   let cekLM = LM;
  //   let batch = {
  //     batch_counter:
  //       PERHIASAN.length +
  //       LM.length +
  //       GS.length +
  //       BERLIAN.length +
  //       DINAR.length,
  //   };
  //   if (PERHIASAN.length != 0) {
  //     console.debug(PERHIASAN," perhiasan")
  //     for (let p of PERHIASAN) {
  //       no++;
  //       perhiasan[no] = btoa(
  //         JSON.stringify({ _id: p.detail._id, flag: "stock", tipe_stock: "buyback", unit: _unit, unit_encoded: 'base64' })
  //       );
  //       perhiasan[no + "_encoded"] = "base64";
  //     }
  //   }

  //   if (LM.length != 0) {
  //     console.debug(cekLM," LMLMLM")
  //     for (let Lm of LM) {
  //       console.debug(Lm.detail._id, "tatang")
  //       no++;
  //       // if (Lm.detail.vendor.code == "antam") {

  //       //   console.debug("adsasdasd")
  //       //   this.vendorService.get("?_hash=1&code=antamrtr").subscribe((response:any)=>{
  //       //     let hashVendor = response

  //       //     lm[no] = btoa(JSON.stringify({ _id: Lm.detail._id, flag: "stock", tipe_stock: "buyback", vendor: hashVendor._hash, vendor_encoded: 'base64'  }));
  //       //     lm[no + "_encoded"] = "base64";
  //       //   })
  //       //   console.debug(lm, "tatasdds")
  //       // } else {
  //         lm[no] = btoa(JSON.stringify({ _id: Lm.detail._id, flag: "stock", tipe_stock: "buyback", unit: _unit, unit_encoded: 'base64' }));
  //         lm[no + "_encoded"] = "base64";
  //       // }

        
        
  //     }
  //   }
  //   if (GS.length != 0) {
  //     for (let Gs of GS) {
  //       no++;
  //       gs[no] = btoa(JSON.stringify({ _id: Gs.detail._id, flag: "stock", tipe_stock: "buyback"   }));
  //       gs[no + "_encoded"] = "base64";
  //     }
  //   }
  //   if (BERLIAN.length != 0) {
  //     for (let b of BERLIAN) {
  //       no++;
  //       berlian[no] = btoa(JSON.stringify({ _id: b.detail._id, flag: "stock", tipe_stock: "buyback" }));
  //       berlian[no + "_encoded"] = "base64";
  //     }
  //   }
  //   if (DINAR.length != 0) {
  //     for (let d of DINAR) {
  //       no++;
  //       dinar[no] = btoa(JSON.stringify({ _id: d.detail._id, flag: "stock", tipe_stock: "buyback" }));
  //       dinar[no + "_encoded"] = "base64";
  //     }
  //   }
  //   let data = Object.assign(batch, perhiasan, lm, gs, berlian, dinar);
  //   console.debug(data, "data update flag");

  //   return data;
  // }

  batchUpdateTransaction(val, key, _unit) {
    let data :any
    let dataProduct : string;
    let idTransaction : any;
    let getProduct : any;
    let kamu : any;

    switch (key) {
      case "perhiasan":
        data = val
        dataProduct = "PERHIASAN"
        break;
      
      case "lm":
        data = val
        dataProduct = "LM"
        break;
        
      case "berlian":
        data = val
        dataProduct = "BERLIAN"
        break;
      
      case "souvenir":
        data = val
        dataProduct = "GS"
        break;

      case "dinar":
          data = val
          dataProduct = "DINAR"
          break;
      default:
        break;
    }
    
    console.debug(data,"data");
    
    for (let isiData of data) {
      idTransaction = isiData.idTransaction
      console.debug(idTransaction,"idtransaksi")
      this.transactionService.get("?_id="+idTransaction).subscribe((response:any)=>{
        getProduct = response

        // perhiasan
        if ( dataProduct == "PERHIASAN") {
          for (let isi of getProduct.product.PERHIASAN) {
            if (isi.detail._id == isiData.detail._id) {
              isi.buyback = "yes"
              let updateP = {_id:isi.detail._id , flag: "stock",unit: _unit, unit_encoded: 'base64', tipe_stock: "buyback", kondisi: isiData.kondisi};
              this.productService.update(updateP).subscribe((response:any)=>{
                console.debug(response);
              })
              console.debug(getProduct.product,"producta");
              let _idTrans = isiData.idTransaction
              let updateData = {_id: _idTrans, product:btoa(JSON.stringify(getProduct.product)), product_encoded: "base64" }
              console.debug(updateData,"produsafascta");
              this.transactionService.update(updateData).subscribe((response:any)=>{
                if (response == false) {
                  return console.debug("update transaksi gagal")
                }
               })
            }
          }
        }

        // LM
        if ( dataProduct == "LM") {
          for (let isi of getProduct.product.LM) {
            if (isi.detail._id == isiData.detail._id) {
              isi.buyback = "yes"
              isi.vendor = "Antam Retro"
              if (isi.detail.vendor.code == "antam") {

                this.vendorService.get("?code=antamrtr").subscribe((response:any)=>{
                  let hashVendor = response;

                  isi.detail.vendor = hashVendor;

                  let updateLM = {_id:isi.detail._id ,vendor:btoa(JSON.stringify(hashVendor)), vendor_encoded:"base64", flag: "stock" ,unit: _unit, unit_encoded: 'base64' , tipe_stock: "buyback"};
                  this.productService.update(updateLM).subscribe((response:any)=>{
                    console.debug(response);
                  })
                })
              }else{
                  let updateLM = {_id:isi.detail._id , flag: "stock"};
                  this.productService.update(updateLM).subscribe((response:any)=>{
                    console.debug(response);
                  })
              }
              let _idTrans = isiData.idTransaction
              let updateData = {_id: _idTrans, product:btoa(JSON.stringify(getProduct.product)), product_encoded: "base64" }
              this.transactionService.update(updateData).subscribe((response:any)=>{
                if (response == false) {
                  return console.debug("update transaksi gagal")
                }
               })               
            }
          }
        }

        //berlian
        if ( dataProduct == "BERLIAN") {
          for (let isi of getProduct.product.BERLIAN) {
            if (isi.detail._id == isiData.detail._id) {
              isi.buyback = "yes"
              let updateB = {_id:isi.detail._id , flag: "stock",unit: _unit, unit_encoded: 'base64', tipe_stock: "buyback"};
              this.productService.update(updateB).subscribe((response:any)=>{
                console.debug(response);
              })
              let _idTrans = isiData.idTransaction
              let updateData = {_id: _idTrans, product:btoa(JSON.stringify(getProduct.product)), product_encoded: "base64" }
              this.transactionService.update(updateData).subscribe((response:any)=>{
                if (response == false) {
                  return console.debug("update transaksi gagal")
                }
               })
            }
          }
        }

        //souvenir
        if ( dataProduct == "GS") {
          for (let isi of getProduct.product.GS) {
            if (isi.detail._id == isiData.detail._id) {
              isi.buyback = "yes"
              let updateGS = {_id:isi.detail._id , flag: "stock",unit: _unit, unit_encoded: 'base64', tipe_stock: "buyback"};
              this.productService.update(updateGS).subscribe((response:any)=>{
                console.debug(response);
              })
              let _idTrans = isiData.idTransaction
              let updateData = {_id: _idTrans, product:btoa(JSON.stringify(getProduct.product)), product_encoded: "base64" }
              this.transactionService.update(updateData).subscribe((response:any)=>{
                if (response == false) {
                  return console.debug("update transaksi gagal")
                }
               })
            }
          }
        }

         //dinar
         if ( dataProduct == "DINAR") {
          for (let isi of getProduct.product.DINAR) {
            if (isi.detail._id == isiData.detail._id) {
              isi.buyback = "yes"
              let updateGS = {_id:isi.detail._id , flag: "stock",unit: _unit, unit_encoded: 'base64', tipe_stock: "buyback"};
              this.productService.update(updateGS).subscribe((response:any)=>{
                console.debug(response);
              })
              let _idTrans = isiData.idTransaction
              let updateData = {_id: _idTrans, product:btoa(JSON.stringify(getProduct.product)), product_encoded: "base64" }
              this.transactionService.update(updateData).subscribe((response:any)=>{
                if (response == false) {
                  return console.debug("update transaksi gagal")
                }
               })
            }
          }
        }

        // let updateData = {_id: idTransaction, product:btoa(JSON.stringify(getProduct.product)), product_encoded: "base64", tipe_stock: "buyback" }
        // console.debug(updateData,"adsaasda");
      //   console.debug(updateData, "weawdasdas")
      //     this.transactionService.update(updateData).subscribe((response:any)=>{
      //    return;
      //  })
      })
    } 
  }



  }


