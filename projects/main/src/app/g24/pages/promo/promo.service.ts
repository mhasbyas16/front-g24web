import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  product = [];
  constructor() {
    this.product.splice(0);
   }

   berlianData(data){
    let section2Berlian = data;

      console.debug(data,"isi section perhiasan")
      // perhiasan
      
      if (Object.keys(section2Berlian).length != 0) {
        section2Berlian.name = 'Berlian';
        section2Berlian.code = 'c01';
        let isiVendor = [];
        let isiPurity = [];
        let isiTypeBerlian = [];
        // Vendors
      if (section2Berlian.vendor == "pv") {
        for (let data of section2Berlian.pickVendor) {
          isiVendor.push(JSON.parse(atob(data)))     
          
        }
        section2Berlian.vendor= isiVendor;
        delete section2Berlian.pickVendor;
      }else{
        delete section2Berlian.pickVendor;
      }
        

        // purity
        if (section2Berlian.purity == "pk") {
          for (let data of section2Berlian.pickPurity) {
            isiPurity.push(JSON.parse(atob(data)))     
          }
          section2Berlian.purity= isiPurity;
          delete section2Berlian.pickPurity;
        }else{
          delete section2Berlian.pickPurity;
        }

        // typePerhiasan
        if (section2Berlian.typeBerlian == "pj") {
          for (let data of section2Berlian.pickTypeBerlian) {
            isiTypeBerlian.push(JSON.parse(atob(data)))     
          }
          section2Berlian.typeBerlian= isiTypeBerlian;
          delete section2Berlian.pickTypeBerlian;
        }else{
          delete section2Berlian.pickTypeBerlian;
        }
      }

      // tipe promosi
      let tipe = JSON.parse(atob(section2Berlian.typePromotion)) 
      section2Berlian.typePromotion = tipe;

      this.product.push(section2Berlian);
  }

  perhiasanData(data){
    let section2Perhiasan = data;

      console.debug(data,"isi section perhiasan")
      // perhiasan
      
      if (Object.keys(section2Perhiasan).length != 0) {
        section2Perhiasan.name = 'Perhiasan';
        section2Perhiasan.code = 'c00';
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

      // tipe promosi
      let tipe = JSON.parse(atob(section2Perhiasan.typePromotion)) 
      section2Perhiasan.typePromotion = tipe;

      this.product.push(section2Perhiasan);
  }

  giftSouvenirData(data, tipe){
    let section2GiftSouvenir = data;

      console.debug(data,"isi section perhiasan")
      // perhiasan
      
      if (Object.keys(section2GiftSouvenir).length != 0) {
        // if(tipe == 's'){
        //   section2GiftSouvenir.name = 'Souvenir';
        // section2GiftSouvenir.code = 'c02';
        // }else{
        //   section2GiftSouvenir.name = 'Gift;
        // section2GiftSouvenir.code = 'c04';
        // }
        section2GiftSouvenir.name = 'Gift Dan Souvenir';
        section2GiftSouvenir.code = 'c02';
        // section2GiftSouvenir.code = ['c02','c04'];
        let isiVendor = [];
        let isiDenom = [];
        let isiSeries = [];
        // Vendors
      if (section2GiftSouvenir.vendor == "pv") {
        for (let data of section2GiftSouvenir.pickVendor) {
          isiVendor.push(JSON.parse(atob(data)))     
          
        }
        section2GiftSouvenir.vendor= isiVendor;
        delete section2GiftSouvenir.pickVendor;
      }else{
        delete section2GiftSouvenir.pickVendor;
      }
        

        // denom
        if (section2GiftSouvenir.denom == "pd") {
          for (let data of section2GiftSouvenir.pickDenom) {
            isiDenom.push(JSON.parse(atob(data)))     
          }
          console.debug(isiDenom,"isi denom")
          section2GiftSouvenir.denom= isiDenom;
          delete section2GiftSouvenir.pickDenom;
        }else{
          delete section2GiftSouvenir.pickDenom;
        }

        // series
        if (section2GiftSouvenir.series == "ps") {
          for (let data of section2GiftSouvenir.pickSeries) {
            isiSeries.push(JSON.parse(atob(data)))     
          }
          section2GiftSouvenir.series= isiSeries;
          delete section2GiftSouvenir.pickSeries;
        }else{
          delete section2GiftSouvenir.pickSeries;
        }
      }

      // tipe promosi
      let tipes = JSON.parse(atob(section2GiftSouvenir.typePromotion)) 
      section2GiftSouvenir.typePromotion = tipes;

      this.product.push(section2GiftSouvenir);
  }

  muliaData(data){
    let section2Mulia = data;
    // return;
      console.debug(data,"isi section Mulia")
      // mulia
      

      if (Object.keys(section2Mulia).length != 0) {
        section2Mulia.name = 'Mulia';
        section2Mulia.code = 'c05';
        let isiVendor = [];
        let isiDenom = [];
        // Vendors
      if (section2Mulia.vendor == "pv") {
        for (let data of section2Mulia.pickVendor) {
          isiVendor.push(JSON.parse(atob(data)))     
          
        }
        console.debug(isiVendor,"isi vendir")
        section2Mulia.vendor= isiVendor;
        delete section2Mulia.pickVendor;
      }else{
        delete section2Mulia.pickVendor;
      }
        

        // denom
        if (section2Mulia.denom == "pd") {
          for (let data of section2Mulia.pickDenom) {
            isiDenom.push(JSON.parse(atob(data)))     
          }
          console.debug(isiDenom,"isi denom")
          section2Mulia.denom= isiDenom;
          delete section2Mulia.pickDenom;
        }else{
          delete section2Mulia.pickDenom;
        }

      }
      // tipe promosi
      let tipes = JSON.parse(atob(section2Mulia.typePromotion)) 
      section2Mulia.typePromotion = tipes;

      this.product.push(section2Mulia);

  }

  dinarData(data){
    let section2Dinar = data;
    // return;
      console.debug(data,"isi section Dinar")
      // mulia
      

      if (Object.keys(section2Dinar).length != 0) {
        section2Dinar.name = 'Dinar';
        section2Dinar.code = 'c06';
        let isiVendor = [];
        let isiDenom = [];
        // Vendors
      if (section2Dinar.vendor == "pv") {
        for (let data of section2Dinar.pickVendor) {
          isiVendor.push(JSON.parse(atob(data)))     
          
        }
        section2Dinar.vendor= isiVendor;
        delete section2Dinar.pickVendor;
      }else{
        delete section2Dinar.pickVendor;
      }
        

        // denom
        if (section2Dinar.denom == "pd") {
          for (let data of section2Dinar.pickDenom) {
            isiDenom.push(JSON.parse(atob(data)))     
          }
          section2Dinar.denom= isiDenom;
          delete section2Dinar.pickDenom;
        }else{
          delete section2Dinar.pickDenom;
        }

      }

      // tipe promosi
      let tipe = JSON.parse(atob(section2Dinar.typePromotion)) 
      section2Dinar.typePromotion = tipe;

      this.product.push(section2Dinar);

  }
}
