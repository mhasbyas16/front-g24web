import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * NOTE :
   * 
   * JANGAN GANTI DISINI, CARI KE FILE ..src/assets/config/server-config.json
   */
  // server: string = "http://localhost:8000";
  // server: string = "http://192.168.100.186:8000";
  // server: string = "http://192.168.100.254:8000";
  // server: string = "http://34.87.141.184:8000";
  server: string = "https://dev.g24sys.com";
  pasphrase = "";

  constructor() {
  }

  setIp(params: any) {
    sessionStorage.setItem("__IP", params);
    this.pasphrase = params.replace(".", "");
  }

  encrypt(text: string) {
    return CryptoJS.AES.encrypt(text.trim(), this.pasphrase.trim()).toString();
  }

  decrypt(encrypted: string) {
    if (encrypted == null) {
      return null;
    }
    return CryptoJS.AES.decrypt(encrypted.trim(), this.pasphrase.trim()).toString(CryptoJS.enc.Utf8);
  }

  setCompany(params: any) {
    sessionStorage.setItem("__company", this.encrypt(JSON.stringify(params)));
    sessionStorage.setItem("__db", this.encrypt(params.db));
  }

  getCompany() {
    return JSON.parse(this.decrypt(sessionStorage.getItem("__company")));
  }

  getDb() {
    return this.decrypt(sessionStorage.getItem("__db"));
  }

  public setAuthentication(userId: string, loginId: string, db?: string) {
    sessionStorage.setItem("__userId", this.encrypt(userId));
    sessionStorage.setItem("__loginId", this.encrypt(loginId));
    if (db == undefined) {
      sessionStorage.setItem("__bearer", this.encrypt(btoa(userId + ":" + loginId)));
    } else {
      sessionStorage.setItem("__bearer", this.encrypt(btoa(userId + ":" + loginId + ":" + db)));
    }
  }

  public getLoginId() {
    return this.decrypt(sessionStorage.getItem("__loginId"));
  }

  public getBearer() {
    return this.decrypt(sessionStorage.getItem("__bearer"));
  }

  public setUser(user: any) {
    sessionStorage.setItem("__user", this.encrypt(JSON.stringify(user)));
  }

  getUser() {
    return JSON.parse(this.decrypt(sessionStorage.getItem('__user')));
  }

  public setRole(user: any) {
    sessionStorage.setItem('__role', this.encrypt(JSON.stringify(user)));
  }

  getRole() {
    return JSON.parse(this.decrypt(sessionStorage.getItem('__role')));
  }

  public setUnit(user: any) {
    sessionStorage.setItem('__unit', this.encrypt(JSON.stringify(user)));
  }

  getUnit() {
    return JSON.parse(this.decrypt(sessionStorage.getItem('__unit')));
  }

  logout() {
    sessionStorage.clear();
  }

  public postHeader(isJSON? : boolean) {
    if(this.getLoginId() != null && isJSON)
    {
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.getBearer()
      };
    } else if (this.getLoginId() != null) {
      return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.getBearer()
      };
    } else {
      return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };
    }
  }

  public uploadHeader() {
    if (this.getLoginId() != null) {
      return {
        // 'Content-Type': 'multipart/form-data',
        // 'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.getBearer()
      };
    } else {
      return {

        'Access-Control-Allow-Origin': '*',
        /*
        'Access-Control-Allow-Credentials':'true',
        'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Encryption-Key',
        'Content-Type':'text/html;charset=utf-8',*/
        'Authorization': 'Bearer 1234'
        // 'Content-Type': 'multipart/form-data',
        // 'Accept': 'application/json'
      };
    }
  }

  public getHeader() {
    console.debug("Check bearer",this.getBearer());
    if (this.getLoginId() != null) {
      return {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.getBearer()
      };
    } else {
      return {
        'Accept': 'application/json'
      };
    }
  }

}
