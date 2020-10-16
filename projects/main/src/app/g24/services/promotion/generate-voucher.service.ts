import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateVoucherService {
  key = "master-api/generate-voucher";
  constructor(private commonService:CommonService) { }

  generate(params){
    return this.commonService.generate(this.key, params);
  }
  message() {
    return this.commonService.message;
  }
}
