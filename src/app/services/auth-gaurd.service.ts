import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanActivate {
  constructor(
    private auth_service: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth_service.getCurrentUser().then((user) => {
      if (user) {
        return true;
      }
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    });
  }
}
