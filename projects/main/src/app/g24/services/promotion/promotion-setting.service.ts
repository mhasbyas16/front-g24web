import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionSettingService {

  key = "master-api/promotion-setting";
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

}
