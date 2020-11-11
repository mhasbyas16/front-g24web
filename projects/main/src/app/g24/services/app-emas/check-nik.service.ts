import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CheckNikService {

  key = "master-api/app-emas";

  constructor(private commonService:CommonService) { }

  message() {
    return this.commonService.message;
  }

  checkNik(data) {
    return this.commonService.task(this.key+"/check-nik", data);
  }
}
