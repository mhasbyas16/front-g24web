import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class BuybackManualService {

  key = "journal-api/buyback-manual";

  constructor(private commonService:CommonService) { }

  jurnal(id : string) {
    let obj = {_id : id};
    return this.commonService.task("journal-api/buyback-manual/add", obj);
  }

  message() {
    return this.commonService.message;
  }
}
