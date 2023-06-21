import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppSettings} from "./app-settings";

@Injectable({
  providedIn: 'root'
})
export class isAdmin implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ((localStorage.getItem(AppSettings.IS_LOGGED_IN) == "true")) {
      return true;
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class notLogin implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ((localStorage.getItem(AppSettings.IS_LOGGED_IN) == "true")) {
      this.router.navigate([AppSettings.DASHBOARD_PAGE]);
      return false;
    }
    return true;
  }
}
