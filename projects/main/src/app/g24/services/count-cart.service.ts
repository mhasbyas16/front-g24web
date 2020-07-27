import { Injectable } from '@angular/core';
import { PERHIASAN, LM, BERLIAN, GS, DINAR } from '../sample/cart';
  import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountCartService {
  perhiasan = PERHIASAN;
  lm = LM;
  berlian = BERLIAN;
  gs = GS;
  dinar = DINAR;

  total = null;

  constructor() { }

  countCart(){
    this.total = this.perhiasan.length+this.lm.length+this.berlian.length+this.gs.length+this.dinar.length;
    
    return this.total;
  }
}
