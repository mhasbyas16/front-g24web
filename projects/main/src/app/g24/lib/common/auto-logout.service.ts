import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { ContentPage } from '../helper/content-page';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {


  MINUTES_UNITL_AUTO_LOGOUT = 10 // in mins
  CHECK_INTERVAL = 1000 // in ms
  STORE_KEY = 'lastAction';
  
  intervalHandler : NodeJS.Timeout = null;

  constructor(private router: Router, private toastr : ToastrService) {
    this.check();
    this.initListener();
    this.initInterval();

    // const passReq : any = JSON.parse(sessionStorage.getItem("pass_req_hr"));
    // this.MINUTES_UNITL_AUTO_LOGOUT = passReq.sess_lifetime;
    console.debug("passReq");
    console.debug(this.MINUTES_UNITL_AUTO_LOGOUT);
    sessionStorage.setItem(this.STORE_KEY, Date.now().toString());
  }

  public getLastAction() {
    return parseInt(sessionStorage.getItem(this.STORE_KEY));
  }

  public setLastAction(lastAction: number) {
    sessionStorage.setItem(this.STORE_KEY, lastAction.toString());
  }

  storageHandler = this.storageEvt.bind(this);
  resetHandler = this.reset.bind(this);
  initListener() {
    document.body.addEventListener('click', this.resetHandler);
    document.body.addEventListener('mouseover', this.resetHandler);
    document.body.addEventListener('mouseout', this.resetHandler);
    document.body.addEventListener('keydown', this.resetHandler);
    document.body.addEventListener('keyup', this.resetHandler);
    document.body.addEventListener('keypress', this.resetHandler);
    window.addEventListener("storage", this.storageHandler);
  }

  removeResetListeners() {
    document.body.removeEventListener('click', this.resetHandler);
    document.body.removeEventListener('mouseover', this.resetHandler);
    document.body.removeEventListener('mouseout', this.resetHandler);
    document.body.removeEventListener('keydown', this.resetHandler);
    document.body.removeEventListener('keyup', this.resetHandler);
    document.body.removeEventListener('keypress', this.resetHandler);
    window.removeEventListener("storage", this.storageHandler);
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    this.intervalHandler = setInterval(() => {
      this.check();
    }, this.CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      clearInterval(this.intervalHandler);
      this.toastr.error("Tidak ada aktifitas lebih dari " + this.MINUTES_UNITL_AUTO_LOGOUT * 60 + " detik", "Auto-Logout!", { closeButton : true, disableTimeOut : true});
      sessionStorage.clear();
      this.router.navigate(['/auth/sign-in']);
      ContentPage.ChangeContent("", true);
    }
  }

  storageEvt() {
    sessionStorage.getItem(this.STORE_KEY);
  }
}
