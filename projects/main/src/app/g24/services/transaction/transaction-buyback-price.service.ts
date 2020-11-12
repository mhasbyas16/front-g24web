import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionBuybackPriceService {

  key = "master-api/transaction-buyback-price";

  constructor(private commonService:CommonService) { }

  get(params) {
    return this.commonService.get(this.key, params);
  }
}
