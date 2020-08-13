import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TanggalService {

  constructor() { }
  
  bulanGenerate (bulan){
    let bulanD = "";
    switch(bulan) {
      case 1: bulanD = "Januari"; break;
      case 2: bulanD = "Februari"; break;
      case 3: bulanD = "Maret"; break;
      case 4: bulanD = "April"; break;
      case 5: bulanD = "Mei"; break;
      case 6: bulanD = "Juni"; break;
      case 7: bulanD = "Juli"; break;
      case 8: bulanD = "Agustus"; break;
      case 9: bulanD = "September"; break;
      case 10: bulanD = "Oktober"; break;
      case 11: bulanD = "November"; break;
      case 12: bulanD = "Desember"; break;
    }
    return bulanD;
  }

  hariGenerate(hari){
    let hariD= "";
    switch(hari) {
      case 0: hariD = "Minggu"; break;
      case 1: hariD = "Senin"; break;
      case 2: hariD = "Selasa"; break;
      case 3: hariD = "Rabu"; break;
      case 4: hariD = "Kamis"; break;
      case 5: hariD = "Jum'at"; break;
      case 6: hariD = "Sabtu"; break;
    }
    return hariD;
  }
}
