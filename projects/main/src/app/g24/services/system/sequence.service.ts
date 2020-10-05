import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  key = "master-api/sequencer";

  constructor(private commonService:CommonService) { }

  use(data?) {
    return this.commonService.customPost("use", this.key, data);
  }

  peek(data?) {
    return this.commonService.customPost("peek", this.key, data);
  }

  message()
  {
    return this.commonService.message;
  }
}
