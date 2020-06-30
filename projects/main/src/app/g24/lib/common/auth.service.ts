
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreResourceService } from './core-resource.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  message:string = "";

  constructor
  (
    private http: HttpClient,
    private coreService: CoreResourceService,
    private sessionService: SessionService
    ) { }

  companyVerification(company:string) : Observable<any> {
    return Observable.create(observer => {
      let url: string = `${this.coreService.server}/signin-api/client/get?code=` + company;

      this.http.get(url, {}).subscribe((respond:any) => {
        let json = { "status": respond.status, "message": respond.message, "data": respond.data };
        console.debug("company", json.data == {}, json.data);
        if (json.status == "failed" || json.data == {}) {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        this.coreService.setCompany(json.data);

        observer.next(respond.data);
        observer.complete();
        return { unsubscribe() { true } };
      })
    });
  }

  userVerification(username:string) : Observable<any> {
    return Observable.create(observer => {
      let url: string = `${this.coreService.server}/signin-api/auth/get?email=` + username + "&_db=" + this.coreService.getDb();
      console.debug("user", url);
      this.http.get(url, {}).subscribe((respond:any) => {
        let json = { "status": respond.status, "message": respond.message, "data": respond.data };
        if (json.status == "failed" || json.data == {}) {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return { unsubscribe() { false } };
        }

        observer.next(respond.data);
        observer.complete();
        return { unsubscribe() { true } };
      })
    });
  }

  authCompany(params: string) {
    return new Observable(observer => {
      console.debug("environment", environment.server);
      const url: string = `${this.sessionService.server}/signin-api/client/get?code=` + params;
      this.http.get(url, {}).subscribe((respond: any) => {
        const json = { status: respond.status, message: respond.message, data: respond.data };

        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        this.sessionService.setCompany(json.data);

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();        
      });
    });
  }
  
  authUsername(params: string) {
    return new Observable(observer => {
      const url: string = `${this.sessionService.server}/signin-api/auth/get?email=` + params + "&_db=" + this.sessionService.getDb();
      console.debug(url);
      this.http.get(url, {}).subscribe((respond: any) => {
        const json = { status: respond.status, message: respond.message, data: respond.data };

        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();        
      });
    });
  }
  
  authLogin(username: string, password: string) {
    return new Observable(observer => {
      const url: string = `${this.sessionService.server}/signin-api/signin`;
      const data = {"_command":"signin", "username":username, "password":password, "_db":this.sessionService.getDb()};

      console.debug("login-data", data);
      this.http.post(url, data, {}).subscribe((respond: any) => {
        const json = { status: respond.status, message: respond.message, data: respond.data };

        if (json.status == "failed") {
          this.message = json.message;
          observer.next(false);
          observer.complete();
          return (observer).unsubscribe();
        }

        // this will used whole the time
        this.sessionService.setAuthentication(json.data.user._id, json.data._id, this.sessionService.getDb());

        // user
        this.sessionService.setUser(json.data.user);

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();        
      });
    });
  }
  
  getMessage(): string {
    return this.message;
  }

  login(username: string, password: string): Observable<any> {
    return Observable.create(observer => {
      let url: string = `${this.coreService.server}/signin-api/auth`;
      const login = username + ":" + password;
      const data = {"_command":"signin", "username":username, "password":password, "_db":this.coreService.getDb()};

      console.log(url);


      this.http.post(url, data, { }).subscribe(
        (respond: any) => {
          
          let json = { "status": respond.status, "message": respond.message, "data": respond.data };
          console.log(json);
          if (json.status == "failed") {
            this.message = json.message;
            observer.next(false);
            observer.complete();
            return { unsubscribe() { false } };
          }

          const user = json.data.user;
          
          this.coreService.setLogin(json.data.user._id, json.data._id, this.coreService.getDb());

          this.coreService.setUser(user);

          observer.next(true);
          observer.complete();
          return { unsubscribe() { true } };
        }
      );
    });

  }

  logout() {
    this.coreService.logout();
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
}
