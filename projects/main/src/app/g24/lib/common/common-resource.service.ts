import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreResourceService } from './core-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CommonResourceService {

  message: string;
  originalResult: any;

  constructor(
    private http: HttpClient,
    private coreService: CoreResourceService) { }

  public prefix() {
    const company = this.coreService.getCompany();
    if (company == null) {
      return null;
    } 
    return company.company;
  }


  public db() {
    return this.coreService.getDb();
  }

  public json(key: string): Observable<any> {
    return Observable.create(observer => {
      this.http.get(key).subscribe((respond: any) => {
        observer.next(respond);
        observer.complete();
        return { unsubscribe() { respond } };
      });
    });
  }

  public choices(key:string, label:string, value:string, params?:any):Observable<any>{
    return Observable.create(observer => {
      
      let url = `${this.coreService.server}/${key}/search`;
      if (params != null && params != undefined){
        url = url + params;
      }

      console.debug("choices", url);

      let request = this.http.get(url, { headers: this.coreService.getHeader() });

      //const output = this.cache.loadFromObservable(key, request);

      request.subscribe((respond: any) => {

        if (respond.status == "failed") {

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        let output = [];
        for (let i of respond.data) {
          const item = {label:i[label], value:i[value]};
          output.push(item);
        }

        this.originalResult = respond;

        observer.next(output);
        observer.complete();
        return { unsubscribe() { output } };
      });
    });
  }

  public list(key: string, params?: string): Observable<any> {
    return Observable.create(observer => {

      let url;
      if (params!=undefined) {
        url = `${this.coreService.server}/${key}/search` + params;
      } else {
        url = `${this.coreService.server}/${key}/search`;
      }
      
      console.debug("list", key, params, url);

      let request = this.http.get(url, { headers: this.coreService.getHeader() });

      //const output = this.cache.loadFromObservable(key, request);

      request.subscribe((respond: any) => {
        //console.debug("respond");
        console.debug("list", respond);
        if (respond.status == "failed") {

          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        observer.next(respond.data);
        observer.complete();
        return { unsubscribe() { respond.data } };
      });
    });
  }

  public get(key: string, params: string): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/get${params}`;
      console.debug(key, url);

      let request = this.http.get(url, { headers: this.coreService.getHeader() });

      // request.subscribe

      //const output = this.cache.loadFromObservable(key + "-" + id, request);

      request.subscribe((respond: any) => {
        if (respond.status == "failed") {
          console.debug(respond.message);
          this.message = respond.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        console.debug(respond.data);
        observer.next(respond.data);
        observer.complete();
        return { unsubscribe() { respond.data } };
      });
    });
  }

  public add(key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/add`;
      console.debug(key, url);

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public batchAdd(key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/batch_add`;

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }  

  public batchUpdate(key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/batch_update`;

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public task(key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}`;
      console.debug(key, url);
      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public update(key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/update`;
      console.debug(key, url);
      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = respond;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public delete(key: string, params: string): Observable<any> {
    return Observable.create(observer => {


      const url = `${this.coreService.server}/${key}/delete`;

      this.http.post(url, this.getFormUrlEncoded(params), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public customPost(operation: string, key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/${operation}`;

      this.http.post(url, this.getFormUrlEncoded(data), { headers: this.coreService.postHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = json;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public upload(key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/upload`;

      console.debug(url);
      console.debug(this.coreService.uploadHeader());
      this.http.post(url, data, { headers: this.coreService.uploadHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          console.debug(json.message);
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = json;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public customUpload(operation: string, key: string, data: any): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/${operation}`;

      console.debug(url);
      console.debug(this.coreService.uploadHeader());
      this.http.post(url, data, { headers: this.coreService.uploadHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = json;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
      });
    });
  }

  public customGet(operation: string, key: string, param: string): Observable<any> {
    return Observable.create(observer => {

      const url = `${this.coreService.server}/${key}/${operation}/${param}`;

      console.debug(url);
      console.debug(param);

      this.http.get(url, { headers: this.coreService.getHeader() }).subscribe((respond: any) => {
        const json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.originalResult = json;

        observer.next(json.data);
        observer.complete();
        return { unsubscribe() { json.data } };
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

    console.debug("getFormUrlEncoded", formBody);
    return formBody.join('&');
  }

  public toJson(data) : string
  {
    let json = JSON.stringify(data);
    console.debug("json", data);
    return json;
  }
}
