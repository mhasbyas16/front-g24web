import { Injectable } from "@angular/core";
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from "../../sample/cart-buyback";

// service
import { TransactionService } from "./transaction.service";
// import { ProductService } from "../product/product.service";
@Injectable({
  providedIn: "root",
})
export class TransactionFlagBuybackService {
  constructor(
    private transactionService: TransactionService,
    // private productService: ProductService
  ) {}

  batchUpdate(_unit) {
    let perhiasan = {};
    let lm = {};
    let no = 0;
    let gs = {};
    let berlian = {};
    let dinar = {};
    let batch = {
      batch_counter:
        PERHIASAN.length +
        LM.length +
        GS.length +
        BERLIAN.length +
        DINAR.length,
    };
    if (PERHIASAN.length != 0) {
      for (let p of PERHIASAN) {
        no++;
        perhiasan[no] = btoa(
          JSON.stringify({ _id: p.detail._id, flag: "stock", tipe_stock: "buyback", unit: _unit, unit_encoded: 'base64' })
        );
        perhiasan[no + "_encoded"] = "base64";
      }
    }

    if (LM.length != 0) {
      for (let Lm of LM) {
        no++;
        lm[no] = btoa(JSON.stringify({ _id: Lm.detail._id, flag: "stock", tipe_stock: "buyback"  }));
        lm[no + "_encoded"] = "base64";
      }
    }
    if (GS.length != 0) {
      for (let Gs of GS) {
        no++;
        gs[no] = btoa(JSON.stringify({ _id: Gs.detail._id, flag: "stock", tipe_stock: "buyback"   }));
        gs[no + "_encoded"] = "base64";
      }
    }
    if (BERLIAN.length != 0) {
      for (let b of BERLIAN) {
        no++;
        berlian[no] = btoa(JSON.stringify({ _id: b.detail._id, flag: "stock", tipe_stock: "buyback" }));
        berlian[no + "_encoded"] = "base64";
      }
    }
    if (DINAR.length != 0) {
      for (let d of DINAR) {
        no++;
        dinar[no] = btoa(JSON.stringify({ _id: d.detail._id, flag: "stock", tipe_stock: "buyback" }));
        dinar[no + "_encoded"] = "base64";
      }
    }
    let data = Object.assign(batch, perhiasan, lm, gs, berlian, dinar);
    console.debug(data, "data update flag");

    return data;
  }

  batchUpdateTransaction(val, key) {
    let data :any
    let dataProduct : string;
    let idTransaction : any;
    let getPerhiasan : any;
    let kamu : any;

    switch (key) {
      case "perhiasan":
        data = val
        dataProduct = "PERHIASAN"
        break;
    
      default:
        break;
    }
    for (let isiData of data) {
      idTransaction = isiData.idTransaction
      this.transactionService.get("?_id="+idTransaction).subscribe((response:any)=>{
        getPerhiasan = response
        if ( dataProduct == "PERHIASAN") {
          for (let isi of getPerhiasan.product.PERHIASAN) {
            if (isi.detail._id == isiData.detail._id) {
              isi.buyback = "yes"
            }
          }
        }
        
        let updateData = {_id: idTransaction, product:btoa(JSON.stringify(getPerhiasan.product)), product_encoded: "base64"}
        console.debug(updateData, "weawdasdas")
          this.transactionService.update(updateData).subscribe((response:any)=>{
         return;
       })
      })
    }
   
   
    
  }



  }


