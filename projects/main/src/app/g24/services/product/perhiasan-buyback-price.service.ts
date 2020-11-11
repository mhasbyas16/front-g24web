import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class PerhiasanBuybackPriceService {

  key = "master-api/perhiasan-buyback";

  constructor(private commonService:CommonService) { }


  get(params){
    return this.commonService.get(this.key, params);
  }
}
