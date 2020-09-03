import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  product = [];
  constructor() { }

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
        for (let vendor of section2Perhiasan.vendor) {
          isiVendor.push(JSON.parse(atob(vendor)))
        }
        section2Perhiasan.vendor= isiVendor;

        // purity
        for (let purity of section2Perhiasan.purity) {
          isiPurity.push(JSON.parse(atob(purity)))
        }
        section2Perhiasan.purity= isiPurity;

        // typePerhiasan
        for (let typePerhiasan of section2Perhiasan.typePerhiasan) {
          isiTypePerhiasan.push(JSON.parse(atob(typePerhiasan)))
        }
        section2Perhiasan.typePerhiasan= isiTypePerhiasan;
      }

      this.product.push(section2Perhiasan);
  }
}
