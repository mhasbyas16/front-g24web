import { Injectable } from '@angular/core';

import { ClientService } from '../../services/client/client.service';

@Injectable({
  providedIn: 'root'
})
export class CifGeneratorService {
  y = new Date().getFullYear().toString().substr(-2);
  year:number;
  m: number;
  x: string;
  rand: number;
  s:number;

  //
  sLength:any;
  sStirng:string;
  
  mString:string;
  l:string;
  hasil:string;
  constructor(
    private clientService: ClientService,
  ) { }

  cifNumber (){

    this.clientService.list().subscribe((response:any)=>{
      console.debug(response,"ISICOUNT");
    });

    let  yearString:string;
    this.year = Number(this.y)+6;
    let randomNumString: string;
    this.m = Math.floor(Math.random()*(99-10+1)+10);
    this.rand = Math.floor(Math.random()*(99999-1+1)+1);
    this.l = this.rand.toString();
    switch (this.l.length) {
      case 5:
        this.x = this.l;
        break;
      case 4:
        this.x = '0'+this.l;
        break;
      case 3:
        this.x = '00'+this.l;
        break;
      case 2:
        this.x = '000'+this.l;
        break;
      case 1:
        this.x = '0000'+this.l;
        break;  
      default:
        break;
    }

    this.s = this.year*this.m*this.rand+7;
    this.sStirng = this.s.toString();
    this.sLength = this.sStirng.substring(this.sStirng.length-1, this.sStirng.length)
    yearString = this.year.toString();
    this.mString = this.m.toString();

    this.hasil = yearString+this.mString+this.x+this.sLength;
    console.debug(this.hasil,"randx");
    //randomNumString = this.randomNum.toString();
    //console.debug(this.randomNum, Number(randomNumString.substring(randomNumString.length-1,randomNumString.length)),randomNumString.length, "random Number");
    return this.hasil;
  }
}
/*
Rumus CIF @Muhammad Hasby Ash S 

yy-mm-xxxxx-s


y = tahun sekarang + 6
m = random(10 - 99)
x = id dari entri ini + 1 (misal: id = 12 >> 00013)
s = y kali m kali x tambah 7 ambil 1 digit terakhir (msial: (6 x 11 x 13) + 7 = 865 >> 5)
*/
