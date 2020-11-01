import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class JurnalEmasService {

  key = "journal-emas-api/hpp_persediaan_emas";
  constructor(private commonservice : CommonService) { }

  list(params?){
    return this.commonservice.list(this.key,params);
  }

  get(params){
    return this.commonservice.get(this.key, params);
  }

  message(){
    return this.commonservice.message;
  }

  PostJournal(data){
    return this.commonservice.task(this.key+"post-jurnal", data);
  }

  ReverseJournal(data){
    return this.commonservice.task(this.key+"reverse-jurnal-emas", data);
  }

  // update(data) {
  //   return this.commonservice.update(this.key, data);
  // }

  // add(data) {
  //   return this.commonservice.add(this.key, data);
  // }

  // delete(data) {
  //   return this.commonservice.delete(this.key, data);
  // }

  //post-journal
  //reverse-journal

  count(data) {
    return this.commonservice.count(this.key, data);
  }
}
