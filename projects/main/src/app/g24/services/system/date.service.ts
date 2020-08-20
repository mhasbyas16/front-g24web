import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  key = "date";
  
  constructor(private commonService:CommonService) { }

  task(params?) {
    return this.commonService.getDate();
  }
}
