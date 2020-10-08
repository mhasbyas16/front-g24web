import { Injectable } from "@angular/core";
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from "../../sample/cart";

// service
import { TransactionService } from "./transaction.service";
import { ProductService } from "../product/product.service";
// import { ProductService } from '../product/product.service';
@Injectable({
  providedIn: "root",
})
export class TransactionFlagService {
  constructor(
    private transactionService: TransactionService,
    private productService: ProductService
  ) {}

  batchUpdate() {
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
          JSON.stringify({ _id: p.detail._id, flag: "jual" })
        );
        perhiasan[no + "_encoded"] = "base64";
      }
    }

    if (LM.length != 0) {
      for (let Lm of LM) {
        no++;
        lm[no] = btoa(JSON.stringify({ _id: Lm.detail._id, flag: "jual" }));
        lm[no + "_encoded"] = "base64";
      }
    }
    if (GS.length != 0) {
      for (let Gs of GS) {
        no++;
        gs[no] = btoa(JSON.stringify({ _id: Gs.detail._id, flag: "jual" }));
        gs[no + "_encoded"] = "base64";
      }
    }
    if (BERLIAN.length != 0) {
      for (let b of BERLIAN) {
        no++;
        berlian[no] = btoa(JSON.stringify({ _id: b.detail._id, flag: "jual" }));
        berlian[no + "_encoded"] = "base64";
      }
    }
    if (DINAR.length != 0) {
      for (let d of DINAR) {
        no++;
        dinar[no] = btoa(JSON.stringify({ _id: d.detail._id, flag: "jual" }));
        dinar[no + "_encoded"] = "base64";
      }
    }
    let data = Object.assign(batch, perhiasan, lm, gs, berlian, dinar);
    console.debug(data, "data update flag");

    return data;
  }

  batchUpdateOne(val = []) {
    let product = {};
    let no = 0;
    let batch = {batch_counter:val.length};

    if (val.length != 0) {
      for (let p of val) {
        no++;
        product[no] = btoa(
          JSON.stringify({ _id: p.detail._id, flag: "booking" })
        );
        product[no + "_encoded"] = "base64";
      }
    }

    let data = Object.assign(batch, product);

    this.productService.batchUpdate(data).subscribe((response:any)=>{
      if (response == false) {
        console.debug("batch update failed");
        return;        
      }
    })
    console.debug(data, "data update flag");
  }
}
