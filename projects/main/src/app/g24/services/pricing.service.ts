import { Injectable } from '@angular/core';
import { CART } from '../sample/cart';

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

  addCart(code: any, harga: any){
    let cartList = CART;
    cartList.push({'id': 1001, 'kode': "cart0033", 'kode_barang': code, 'qty': 2, 'harga': harga});

    return cartList.length;
  }
}
