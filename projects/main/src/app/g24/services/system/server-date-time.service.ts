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

  getDateOnly(utc : string) {
    let split : string[] = utc.split("T");
    let date : string = split[0];

    return date;
  }

  getTimeOnly(utc : string) {
    let split : string[] = utc.split("T");
    let time : string = split[1].split("Z")[0];

    return time;
  }
}
