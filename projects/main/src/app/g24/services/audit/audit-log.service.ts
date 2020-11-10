import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  key = "master-api/log"

  constructor
  (
    private commonService : CommonService
  ) 
  {
    
  }

  list(params : string)
  {
    return this.commonService.list(this.key, params);
  }

  get(params : string)
  {
    return this.commonService.get(this.key, params);
  }

  message()
  {
    return this.commonService.message;
  }
}
