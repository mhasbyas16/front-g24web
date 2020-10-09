import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../core-services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private sessionService: SessionService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const user = this.sessionService.getUser();
      const authenticated = (user != null);

      // roles
      const role = next.data.role;
      const getRole = this.sessionService.getRole();
      const isAllowed = role.indexOf(getRole["name"]);

      if (!authenticated) {
        this.router.navigate(['/auth/sign-in']);        
        return false;
      }
      if (isAllowed != 0){
        this.router.navigate(['/auth/sign-in']);        
        return false;
      }

      return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // roles
    const role = next.data.role;
    const getRole = this.sessionService.getRole();
    let isAllowed = role.includes[getRole];

    if (isAllowed != 0){
      this.router.navigate(['/auth/sign-in']);        
      return false;
    }
      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
