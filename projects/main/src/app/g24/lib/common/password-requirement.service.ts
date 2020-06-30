import { Injectable } from '@angular/core';
import { CommonResourceService } from './common-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordRequirementService {

  key = "admin-api/password-requirement";
  key2 = "signin-api/password-requirement";

  constructor(private commonService:CommonResourceService) { }

  list(params?) {
    return this.commonService.list(this.key, params);
  }

  get(params){
    return this.commonService.get(this.key, params);
  }
  
  siGet(params){
    return this.commonService.get(this.key2, params);
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
}
