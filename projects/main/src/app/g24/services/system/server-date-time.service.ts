import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ServerDateTimeService {

  key = "date";
  
  constructor(private commonService:CommonService) { }

  task(params?) {
    return this.commonService.getDate();
  }

  message() {
    return this.commonService.message;
  }
}
