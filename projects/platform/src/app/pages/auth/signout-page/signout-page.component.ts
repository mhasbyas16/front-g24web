import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-page',
  templateUrl: './signout-page.component.html',
  styleUrls: ['./signout-page.component.scss']
})
export class SignoutPageComponent implements OnInit {

  spinner = false;
  error:string = null;

  constructor(
    // app
    private authService: AuthService,

    // angular
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.logout();  
    this.router.navigate(["/auth/signin"]);
  }
}
