import { Injectable } from '@angular/core';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class KonversiService {
  key = "master-api/konversi";
  constructor(private commonservice : CommonService) { }

  list(params?){
    return this.commonservice.list(this.key,params);
  }

  get(params){
    return this.commonservice.get(this.key, params);
  }

  message() {
    return this.commonservice.message;
  }

  update(data) {
    return this.commonservice.update(this.key, data);
  }

  //RESPONSE 404
  approve(data){
    return this.commonservice.task(this.key+"/approve",data);
  }

  add(data) {
    return this.commonservice.add(this.key, data);
  }

  // delete(data) {
  //   return this.commonservice.delete(this.key, data);
  // }

  count(data) {
    return this.commonservice.count(this.key, data);
  }
}
