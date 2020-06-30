import { Injectable } from '@angular/core';
import { CommonResourceService } from 'src/app/lib/common/common-resource.service';
import { KnownGenericException } from 'src/app/lib/exceptions/known-generic-exception';
import { StringHelper } from 'src/app/lib/helper/string-helper';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  key = "system-api/sequence";

  constructor(private commonService:CommonResourceService) { }

  list(params?) {
    return this.commonService.list(this.key, params);
  }

  get(params){
    return this.commonService.get(this.key, params);
  }

  message() {
    return this.commonService.message;
  }

  update(data) {
    return this.commonService.update(this.key, data);
  }

  add(data) {
    return this.commonService.add(this.key, data);
  }

  delete(data) {
    return this.commonService.delete(this.key, data);
  }


  /**
   * Generates sequence based of 'descriptor' and 'branchCode'.
   * 
   * This gets from a Database Collection/Table > Sequence
   * 
   * Ex. : descriptor = IN (for Initiation), branchCode = 00005, current date = 20-02-2020
   * and from database = 1
   * 
   * Result: IN-00005-200220-00001 (Without '-', 18 digits)
   * 
   * 
   * @param descriptor 
   * @param branchCode 
   */
  public async generate(service : SequenceService, descriptor : string, branchCode : string) : Promise<string>
  {
      let date : Date = new Date();
      let fDate = date.toLocaleDateString('en-GB')
      let key = descriptor + "-" + branchCode + "-" + fDate;
      let seq : string = "";
      seq = seq.concat(descriptor);
      seq = seq.concat(branchCode);
      let split = date.toLocaleDateString('en-GB').split('-')
      seq = seq.concat(...split);

      let toSearch = "?key_encoded=string&key=" + key;
      let output = await this.list(toSearch).toPromise();
      let value : number = 1;
      let nSequencer = {key : key, value : value}
      if(output == null)
      {
        console.log("Generate Sequence Fail. No response");
        throw new KnownGenericException("Generate Sequence Fail. No response");
      }

      if(output == "[]")
      {
        let promise = this.add(nSequencer).toPromise()
        if(promise == null)
        {
          console.log("Generate Sequence Fail. Insert Fail")
          throw new KnownGenericException("Generate Sequence Fail. Insert Fail")
        }
        
      } else
      {
        let num = output.value
        if(num == 99999)
        {
          nSequencer.value = 1

        } else
        {
          nSequencer.value = num + 1
        }
        let promise = this.update(nSequencer).toPromise()
        if(promise == null)
        {
          throw new KnownGenericException("Generate Sequence Fail. Update Fail")
        }
      }
      seq = seq.concat(StringHelper.LeftZeroPad(nSequencer.value.toString(), 5));

      return seq;
  }
}
