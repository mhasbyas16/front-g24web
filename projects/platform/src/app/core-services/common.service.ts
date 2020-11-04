import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  logoutMessage: string = "Session Expired";
  message: string;
  code : string;
  originalResult: any;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private toastr : ToastrService
    ) { }

  public prefix() {
    const company = this.sessionService.getCompany();
    if (company == null) {
      return null;
    } 
    return company.company;
  }

  public getDb() {
    return this.sessionService.getDb();
  }

  public json(key: string): Observable<any> {
    return new Observable(observer => {
      this.http.get(key).subscribe((respond: any) => {
        observer.next(respond);
        observer.complete();
        return (observer).unsubscribe();
      });
    });
  }

  public choices(key:string, label:string, value:string, params?:any):Observable<any>{
    return new Observable(observer => {
      
      

      let url = `${this.sessionService.server}/${key}/search`;
      if (params != null && params != undefined){
        url = url + params;
      }
      const request = this.http.get(url, { headers: this.sessionService.getHeader() });

      request.subscribe((respond: any) => {
        console.debug("choices", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        let output = [];
        for (let i of respond.data) {
          const item = {label:i[label], value:i[value]};
          output.push(item);
        }

        this.originalResult = respond;

        observer.next(output);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }

        observer.error(error);
        observer.complete();
        throw error;
      });
    });    
  }

  public count(key: string, params?: string): Observable<any> {
    return new Observable(observer => {

      let url;
      if (params!=undefined) {
        url = `${this.sessionService.server}/${key}/count` + params;
      } else {
        url = `${this.sessionService.server}/${key}/count`;
      }
      const request = this.http.get(url, { headers: this.sessionService.getHeader() });

      request.subscribe((respond: any) => {
        console.debug("list", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();;
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = respond;

        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();;
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }
  

  public list(key: string, params?: string): Observable<any> {
    return new Observable(observer => {

      let url;
      if (params!=undefined) {
        url = `${this.sessionService.server}/${key}/search` + params;
      } else {
        url = `${this.sessionService.server}/${key}/search`;
      }
      const request = this.http.get(url, { headers: this.sessionService.getHeader() });

      request.subscribe((respond: any) => {
        console.debug("list", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();;
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = respond;

        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();;
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }

        observer.error(error);
        throw error;
      });
    });
  }

  public generate(key: string, params: string): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.sessionService.server}/${key}/generate${params}`;
      console.debug(key, url);

      let request = this.http.get(url, { headers: this.sessionService.getHeader() });
      request.subscribe((respond: any) => {
        console.debug("generate voucher", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        console.debug(respond.data);
        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public get(key: string, params: string): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/get${params}`;
      console.debug(key, url);

      let request = this.http.get(url, { headers: this.sessionService.getHeader() });
      request.subscribe((respond: any) => {
        console.debug("get", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        console.debug(respond.data);
        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public add(key: string, data: any, notFormUrlEncoded? : boolean): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/add`;
      console.debug(key, url, data);
      // let encodedData = notFormUrlEncoded ? data : this.getFormUrlEncoded(data); // true: send Object form, false: send URL Encoded form

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        console.debug("add", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public batchAdd(key: string, data: any): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/batch_add`;

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        console.debug("batch-add", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }

          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }  

  public batchUpdate(key: string, data: any): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/batch_update`;

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        console.debug("batch-update", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public task(key: string, data: any): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}`;
      
      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        console.debug("task", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public update(key: string, data: any, notFormUrlEncoded? : boolean): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/update`;
      // let encodedData = notFormUrlEncoded ? data : this.getFormUrlEncoded(data); // true: send Object form, false: send URL Encoded form
      
      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        
        console.debug("update", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public delete(key: string, params: string): Observable<any> {
    return new Observable(observer => {
      const url = `${this.sessionService.server}/${key}/delete`;

      this.http.post(url, this.getFormUrlEncoded(params), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        
        console.debug("delete", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public customPost(operation: string, key: string, data: any): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/${operation}`;

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.sessionService.postHeader() }).subscribe((respond: any) => {
        
        console.debug("customPost", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = json;

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public upload(key: string, data: any): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/upload`;

      this.http.post(url, data, { headers: this.sessionService.uploadHeader() }).subscribe((respond: any) => {
        console.debug("upload", url, respond);

        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          console.debug(json.message);
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public customUpload(operation: string, key: string, data: any): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/${operation}`;

      this.http.post(url, data, { headers: this.sessionService.uploadHeader() }).subscribe((respond: any) => {
        console.debug("customUpload", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.originalResult = json;

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public customGet(operation: string, key: string, param: string): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/${operation}/${param}`;

      this.http.get(url, { headers: this.sessionService.getHeader() }).subscribe((respond: any) => {
        console.debug("customGet", url, respond);
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }


  public download(key: string, params: string): Observable<any> {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}/download${params}`;

      let request = this.http.get(url, { headers: this.sessionService.getHeader() });

      request.subscribe((respond: any) => {
        console.debug("download", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          console.debug(respond.message);
          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public getDate(): Observable<any>  {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/date`;

      let request = this.http.get(url, { headers: this.sessionService.getHeader() });

      request.subscribe((respond: any) => {
        console.debug("download", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          console.debug(respond.message);
          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public custom(key : string, data : any) {
    return new Observable(observer => {

      const url = `${this.sessionService.server}/${key}${data}`;

      let request = this.http.get(url, { headers: this.sessionService.getHeader() });

      request.subscribe((respond: any) => {
        console.debug("download", url, respond);
        if (respond.status == "failed") {

          if(respond.code && respond.code == "401")
          {
            this.sessionService.logout();
            this.sessionService.gotoSignIn();
            this.showLogoutNotification();
          }
          
          console.debug(respond.message);
          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        if(respond.status == "auth-failed")
        {
          this.sessionService.logout();
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(respond.data);
        observer.complete();
        return (observer).unsubscribe();
      }, error => {
        if(error.status = "401")
        {
          this.sessionService.logout();
          this.sessionService.gotoSignIn();
          this.showLogoutNotification();
        }
        observer.error(error);
        observer.complete();
        throw error;
      });
    });
  }

  public getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  private showLogoutNotification()
  {
    this.toastr.error(this.logoutMessage, "Session Expired", {disableTimeOut: true, tapToDismiss: true, positionClass: "toast-top-center"});
  }

}
