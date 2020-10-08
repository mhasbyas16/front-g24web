import { Injectable } from '@angular/core';
import { CommonService } from '../../../../../../platform/src/app/core-services/common.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionBookingService {

  key = "master-api/transaction-booking";

  constructor(private commonService:CommonService) { }

  count(params?) {
    return this.commonService.count(this.key, params);
  }
  list(params?) {
    return this.commonService.list(this.key, params);
  }

  get(params) {
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

  batchUpdate(data){
    return this.commonService.batchUpdate(this.key, data);
  }

  batchAdd(data){
    return this.commonService.batchUpdate(this.key, data);
  }
}
