import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';
import { StringHelper } from '../../lib/helper/string-helper';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  key = "master-api/sequencer";

  constructor(private commonService:CommonService) { }

  /**
   * Generate otomatis PO
   * 
   * @param kodeUnit Kode Unit dari User
   * @param tgl format : "YYYY-MM-dd"
   */
  async generatePO(kodeUnit : string, tgl : string)
  {
    let key = "PO-"+kodeUnit+ "-" + tgl;

    let seq : any = false;
    try
    {
      seq = await this.use({key : key}).toPromise();
    } catch(err) {
      throw err;
    }
    
    let date_split = tgl.split("-");
    let year = date_split[0];
    let month = date_split[1];
    let date = date_split[2];

    let value = StringHelper.LeftZeroPad(Number(seq.value).toString(), 5);
    let PO : any = "PO" + kodeUnit + year.substring(2, 4) + month + date + value;

    return PO;
  }

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
