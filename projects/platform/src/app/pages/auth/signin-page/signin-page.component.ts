import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  spinner = false;

  state:number = 1;
  company:string = null;
  username:string = null;
  name:string = null;
  password:string = null;

  error:string = null;

  constructor(
    // app
    private authService:AuthService,

    // angular
    private router: Router,
  ) { 
    /*if (this.authService.isSignin()) {
      this.router.navigate(["/app/example"]);
    }*/
  }

  ngOnInit(): void {
    this.authService.logout();
    const company= "g24";
    this.authService.authCompany(company).subscribe((response:any) => {
      this.spinner = false;
      if (response == false) {
        if (this.authService.getMessage() != null) {
          this.error = this.authService.getMessage();
        }    
        return;
      }
      console.debug("response", response);
      this.company = response.name;
      this.state = 2;
    });  
  }

  submit(data) {

    // company
    if (this.state == 1) {   
      if (!data.valid) {
        this.error = "Please fill company field"
        return;
      }      
      console.debug("company", data.value);
      this.spinner = true;
      this.authService.authCompany(data.value.company).subscribe((response:any) => {
        this.spinner = false;
        if (response == false) {
          if (this.authService.getMessage() != null) {
            this.error = this.authService.getMessage();
          }    
          return;
        }
        console.debug("response", response);
        this.company = response.name;
        this.state = 2;
      });
      return;
    }

    // username
    if (this.state == 2) {
      if (!data.valid) {
        this.error = "Please fill username field"
        return;
      }   
      console.debug("username", data.value.username);
      this.spinner = true;
      this.authService.authUsername(data.value.username).subscribe((response:any) => {
        this.spinner = false;
        if (response == false) {
          if (this.authService.getMessage() != null) {
            this.error = this.authService.getMessage();
          }    
          return;
        }
        if (response.suspend) {
          this.error = "Account suspended until " + response.suspend;
          this.state = 1;
          return;
        }
        console.debug("response", response);
        this.name = response.name;
        this.username = response.email;
        this.state = 3;
      });
      return;   
    }

    // password
    if (this.state == 3) {
      if (!data.valid) {
        this.error = "Please fill password field"
        return;
      }   
      this.spinner = true;
      this.authService.authLogin(this.username, data.value.password).subscribe((response:any) => {
        this.spinner = false;
        if (response == false) {
          if (this.authService.getMessage() != null) {
            this.error = this.authService.getMessage();
          }   
          return;         
        }
        this.router.navigate(["/app/example"]);
      });    
    }
  }

}
