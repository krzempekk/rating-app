import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const checkPrivileges = user => {
      if (!user) {
        this.router.navigateByUrl('/login');
        return false;
      }

      if (next.url[0] && next.url[0].path === 'admin') {
        if (this.userService.hasRole('ADMIN')) {
          return true;
        } else {
          this.router.navigateByUrl('/');
          return false;
        }
      }

      return true;
    };

    if (this.userService.userLoaded) {
      return checkPrivileges(this.userService.user);
    }

    return this.userService.userObservable$.pipe(map(user => {
      return checkPrivileges(user);
    }));
  }

}
