import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class JurnalInisiasiService {

  key = "journal-api/inisiasi";

  constructor(private commonService:CommonService) { }
  
  bayarDinar(id : string) {
    let obj = {_id : id}
    return this.commonService.task("journal-api/inisiasi/bayar-emas", obj); // currently ke emas
  }

  bayarEmas(id : string) {
    let obj = {_id : id}
    return this.commonService.task("journal-api/inisiasi/bayar-emas", obj);
  }

  bayarPerhiasan(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/bayar-perhiasan", obj);
  }

  bayarSouvenir(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/bayar-perhiasan", obj); // currently ke perhiasan
  }
  
  bayarGift(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/bayar-perhiasan", obj); // currently ke perhiasan
  }
  
  bayarPermata(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/bayar-permata", obj);
  }

  terima(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/terima", obj);
  }

  terimaPerhiasan(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/terima-perhiasan", obj);
  }

  terimaSouvenir(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/terima-perhiasan", obj); // currently ke perhiasan
  }

  terimaGift(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/terima-perhiasan", obj); // currently ke perhiasan
  }

  terimaPermata(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/terima-permata", obj); // currently ke perhiasan
  }

  message() {
    return this.commonService.message;
  }
}
