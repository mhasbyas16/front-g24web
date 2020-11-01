import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CoreResourceService } from './core-resource.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean {
    const user = this.coreService.getUser();
    
    const authenticated = (user != null);

    if (!authenticated) {
      console.debug("Un-authenticated");
      this.router.navigate(["/auth/sign-in"]);
      console.debug(this.router.routerState);
      return false;
    }
    
    return true;
  }

  constructor(private router: Router, private coreService:CoreResourceService) { }
}
