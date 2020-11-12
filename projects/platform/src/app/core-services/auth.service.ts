import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  message;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getMessage(): string {
    return this.message;
  }

  isSignin():boolean {
    if (this.sessionService.getLoginId() != null) {
      return true;
    }
    return false;
  }

  getIp() {
    return new Observable(observer => {
      const url:string = "http://api.ipify.org?format=json";
      this.http.get(url).subscribe((respond:any)=>{
        this.sessionService.setIp(respond.ip);
      });
    })
  }

  async setServerConfig() {
    let protocol = window.location.protocol;
    let name = window.location.hostname;
    let port = window.location.port;
    port = port == "" || port == "0" ? "" : port;
    let filePath = "/assets/config/server-config.json";
    let url = protocol + "//" + name + ":" + port + filePath;
    let file = await this.http.get(url).toPromise();
    console.debug(file);

    this.sessionService.server = file['backend-url'];

    console.debug(this.sessionService.server)

    return file;
  }

  backCompany()
  {
    this.sessionService.removeCompany();
  }

  authCompany(params: string) {
    this.setServerConfig();
    // let json = 
    // console.debug(json);

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
      const url: string = `${this.sessionService.server}/signin-api/auth/get?username=` + params + "&_db=" + this.sessionService.getDb();
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

        // role
        this.sessionService.setRole(json.data.user.role);

        // unit
        // role
        this.sessionService.setUnit(json.data.user.unit);

        observer.next(json.data);
        observer.complete();
        return (observer).unsubscribe();        
      });
    });
  }  

  logout() {
    this.sessionService.logout();
  }

  forgotPassword(username: string) {
    return new Observable(observer => {
      const url: string = `${this.sessionService.server}/signin-api/forgot-password`;
      const data = {"_command":"forgotpassword", "email":username, "_db":this.sessionService.getDb()};

      this.http.post(url, data, {}).subscribe((respond: any) => {
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

  resetPassword(username: string, password: string, token: string) {
    return new Observable(observer => {
      const url: string = `${this.sessionService.server}/signin-api/reset-password`;
      const data = {"_command":"resetpassword", "email":username, "password":password, "token":token, "_db":this.sessionService.getDb()};

      this.http.post(url, data, {}).subscribe((respond: any) => {
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
}

