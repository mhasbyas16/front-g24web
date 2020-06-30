import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreResourceService {

  server: string = "http://34.87.63.184:7000";
  // server: string = "http://localhost:27017";


  showSidemenu: boolean = true;


  constructor() { }

  // bearer: secured komunikasi dengan server
  public setLogin(userId: string, loginId: string, db?: string) {
    sessionStorage.setItem("__userId", userId);
    sessionStorage.setItem("__loginId", loginId);
    if (db == undefined) {
      sessionStorage.setItem("__bearer", btoa(userId + ":" + loginId));
    } else {
      sessionStorage.setItem("__bearer", btoa(userId + ":" + loginId + ":" + db));
    }
  }

  public setUser(user: any) {
    sessionStorage.setItem("__user", JSON.stringify(user));
  }

  public setCompany(company: any) {
    sessionStorage.setItem("__company", JSON.stringify(company));
  }

  public getCompany() {
    const company = JSON.parse(sessionStorage.getItem("__company"));
    return company;
  }

  public getDb() {
    const company = JSON.parse(sessionStorage.getItem("__company"));
    if (company == null) {
      return null;
    }
    return company.db;
  }

  public getUser() {
    const user = JSON.parse(sessionStorage.getItem("__user"));
    return user;
  }

  public getBearer(): string {
    return sessionStorage.getItem("__bearer");
  }

  public getUserId(): string {
    return sessionStorage.getItem("__userId");
  }

  public getLoginId(): string {
    console.debug("getLoginId()", sessionStorage.getItem("__loginId"));
    return sessionStorage.getItem("__loginId");
  }

  public logout() {
    sessionStorage.clear();
  }

  public postHeader() {
    if (this.getLoginId() != null) {
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

  public setShowSidemenu(v: any) {
    this.showSidemenu = v;
  }

}
