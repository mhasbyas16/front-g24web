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
}
