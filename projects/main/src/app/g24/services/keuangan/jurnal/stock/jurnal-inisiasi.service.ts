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

  bayar(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/bayar", obj);
  }

  terima(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/inisiasi/terima", obj);
  }

  message() {
    return this.commonService.message;
  }
}