import { Injectable } from '@angular/core';
import { PERHIASAN } from '../sample/cart';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor() { }

  pricePerhiasan(berat: any, harga_baku: any, baku_tukar: any, margin_baku: any, ppn_baku: any){
    let harga_kadar:any ;
    let margin:any ;
    let hjual_plusmargin:any ;
    let ppn_jual:any ;
    let harga_jual: any ;

    harga_kadar = (berat*harga_baku*baku_tukar)/100;
    margin = margin_baku/100*harga_kadar;
    hjual_plusmargin = harga_kadar+margin;
    ppn_jual = hjual_plusmargin*ppn_baku/100;
    harga_jual = ppn_jual+hjual_plusmargin; 
    
    return harga_jual;
  }
  priceBatuMulia(harga_baku:any,kadar:any,berat:number,margin:any,hppBatu:any,marginBatu:any,hppBerlian:any,marginBerlian:any,ongkos:any){
    // ((((HARGA DASAR UNTUK PERHIASAN BATU PERMATA*kadar*berat emas)*
        // (100%+Margin Jenis Penjualan ))+
        // HPP batu+margin batu+HPP berlian+margin berlian+ongkos pembuatan))
      let paramMarginBerlian =   hppBerlian * marginBerlian / 100
      let paramMarginBatu = hppBatu * marginBatu / 100
      let paramMarginPenjualan = harga_baku  *  berat * (kadar/1000) * (1+(margin/100))
      let total = paramMarginPenjualan + hppBerlian + hppBatu + paramMarginBatu + paramMarginBerlian  + ongkos
      return total;
  }

  priceLogamMulia(harga_baku:any, margin:any){
     let hargaLM = harga_baku * (1 + (margin / 100))
     return hargaLM;
  }

  priceSouvenir(harga_baku:any, margin:any, denom:any, ppn_baku:any, ongkos:any){
    let hargaDenom = harga_baku * denom
    let hargaOngkos = hargaDenom + ongkos
    let hargaMargin = hargaOngkos * (1 + (margin / 100))
    let hargaPPN = hargaMargin * (1 + (ppn_baku / 100))
    
    let hargaSouvenir = hargaPPN
    return hargaSouvenir;
 }
  priceDinar(harga_baku:any, margin:any){
    let hargaDinar = harga_baku * (1 + (margin / 100))
    return hargaDinar;
  }

  buybackPricePerhiasan(cekKondisi: any, kadar: any, berat: any, hargaDasarBuyback : any){
    let hargaBBPerhiasan = 0
    if (cekKondisi == 1) {
      if (kadar >= 750 ) {
        hargaBBPerhiasan = Math.floor(hargaDasarBuyback * ((kadar+90)/1000) * berat / 1000)* 1000
      } else {
        hargaBBPerhiasan = Math.floor(hargaDasarBuyback * ((kadar+50)/1000) * berat / 1000)* 1000
      }
    }else if(cekKondisi == 2){
        hargaBBPerhiasan = Math.floor(hargaDasarBuyback * ((kadar-20)/1000) * berat / 1000)* 1000
    }else{
        hargaBBPerhiasan = 0
    }
    console.debug(hargaBBPerhiasan, "wew")
    return hargaBBPerhiasan
  }

  buybackPriceBerlian(hargaBB: any, berat: any, kadar: any, potBbBerlian : any, potBbBatu: any, hppBBBatu: any, hppBBBerlian: any){
    let hargaBBBerlian = 0

    hargaBBBerlian = ( (Number(hargaBB) * Number(berat) * Number(kadar) / 1000) + (Number(hppBBBatu) * (100-potBbBatu)/100) + (Number(hppBBBerlian) * (100-potBbBerlian)/100) )
    hargaBBBerlian = Math.floor(hargaBBBerlian/10000)*10000
    console.debug(hargaBB, "hargaBB")
    console.debug(berat, "berat")
    console.debug(kadar, "kadar")
    console.debug(potBbBatu, "potBbBatu")
    console.debug(potBbBerlian, "potBbBerlian")
    console.debug(hppBBBatu, "hppBBBatu")
    console.debug(hppBBBerlian, "hppBBBerlian")
    console.debug(hargaBBBerlian, "hargaBBBerlian")
    let cek1 =  (Number(hargaBB) * Number(berat) * Number(kadar) / 1000)
    let cek2 = (Number(hppBBBatu) * (100-potBbBatu)/100)
    console.debug(cek1, "cek1")
    console.debug(cek2, "cek2")
    return hargaBBBerlian
  }
}
