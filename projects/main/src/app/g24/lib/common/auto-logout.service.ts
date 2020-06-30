import { Injectable } from "@angular/core";
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {


  MINUTES_UNITL_AUTO_LOGOUT = .5 // in mins
  CHECK_INTERVAL = 1000 // in ms
  STORE_KEY = 'lastAction';

  constructor(private router: Router) {
    this.check();
    this.initListener();
    this.initInterval();

    const passReq : any = JSON.parse(sessionStorage.getItem("pass_req_hr"));
    this.MINUTES_UNITL_AUTO_LOGOUT = passReq.sess_lifetime;
    console.log("passReq");
    console.log(this.MINUTES_UNITL_AUTO_LOGOUT);
    sessionStorage.setItem(this.STORE_KEY, Date.now().toString());
  }

  public getLastAction() {
    return parseInt(sessionStorage.getItem(this.STORE_KEY));
  }

  public setLastAction(lastAction: number) {
    sessionStorage.setItem(this.STORE_KEY, lastAction.toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
    window.addEventListener("storage", () => this.storageEvt());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, this.CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      sessionStorage.clear();
      this.router.navigate(['/auth/sign-in']);
    }
  }
  storageEvt() {
    sessionStorage.getItem(this.STORE_KEY);
  }
}
