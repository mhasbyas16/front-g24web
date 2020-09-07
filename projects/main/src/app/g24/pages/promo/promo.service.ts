import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  product = [];
  constructor() {
    this.product.splice(0);
   }

  perhiasanData(data){
    let section2Perhiasan = data;

      console.debug(data,"isi section perhiasan")
      // perhiasan
      section2Perhiasan.name = 'Perhiasan';
      section2Perhiasan.code = 'c00';
      if (Object.keys(section2Perhiasan).length != 0) {
        let isiVendor = [];
        let isiPurity = [];
        let isiTypePerhiasan = [];
        // Vendors
      if (section2Perhiasan.vendor == "pv") {
        for (let data of section2Perhiasan.pickVendor) {
          isiVendor.push(JSON.parse(atob(data)))     
          
        }
        section2Perhiasan.vendor= isiVendor;
        delete section2Perhiasan.pickVendor;
      }else{
        delete section2Perhiasan.pickVendor;
      }
        

        // purity
        if (section2Perhiasan.purity == "pk") {
          for (let data of section2Perhiasan.pickPurity) {
            isiPurity.push(JSON.parse(atob(data)))     
          }
          section2Perhiasan.purity= isiPurity;
          delete section2Perhiasan.pickPurity;
        }else{
          delete section2Perhiasan.pickPurity;
        }

        // typePerhiasan
        if (section2Perhiasan.typePerhiasan == "pj") {
          for (let data of section2Perhiasan.pickTypePerhiasan) {
            isiTypePerhiasan.push(JSON.parse(atob(data)))     
          }
          section2Perhiasan.typePerhiasan= isiTypePerhiasan;
          delete section2Perhiasan.pickTypePerhiasan;
        }else{
          delete section2Perhiasan.pickTypePerhiasan;
        }
      }

      this.product.push(section2Perhiasan);
  }
}
