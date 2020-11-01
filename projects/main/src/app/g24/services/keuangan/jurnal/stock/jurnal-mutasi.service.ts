import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class JurnalMutasiService {

  key = "journal-api/mutasi";
  
  constructor(private commonService:CommonService) { }

  kirim(id : string) {
    let obj = {_id : id}
    return this.commonService.task(this.key + "/kirim", obj);
  }
  
  terima(id : string) {
    let obj = {_id : id}
    return this.commonService.task(this.key + "/terima", obj);
  }
}
