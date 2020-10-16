import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class InisiasiService {

  key = "master-api/inisiasi";

  constructor(private commonService:CommonService) { }

  list(params?) {
    return this.commonService.list(this.key, params);
  }

  get(params){
    return this.commonService.get(this.key, params);
  }

  message() {
    return this.commonService.message;
  }

  update(data) {
    return this.commonService.update(this.key, data);
  }

  add(data) {
    return this.commonService.add(this.key, data);
  }

  delete(data) {
    return this.commonService.delete(this.key, data);
  }

  count(params) {
    return this.commonService.count(this.key, params);
  }

  ApprovalInisiasiEmas(data) {
    return this.commonService.task("master-api/inisiasi/approval-inisiasi-emas", data);
  }

  TerimaPerhiasan(data) {
    return this.commonService.task("master-api/inisiasi/terima-perhiasan", data);
  }

  TerimaSouvenir(data) {
    return this.commonService.task("master-api/inisiasi/terima-souvenir", data);
  }

  TerimaGift(data) {
    return this.commonService.task("master-api/inisiasi/terima-gift", data);
  }

  TerimaDinar(data) {
    return this.commonService.task("master-api/inisiasi/terima-dinar", data);
  }

  TerimaEmas(data) {
    return this.commonService.task("master-api/inisiasi/terima-emas", data);
  }

  TerimaPermata(data) {
    return this.commonService.task("master-api/inisiasi/terima-permata", data);
  }

}
