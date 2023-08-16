import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const url = state.url;

    // if (this.authService.isLogin) {
    //   this.router.navigate(['statistic']);
    //   return of(true);
    // }

    // this.router.navigate(['login']);
    // return of(false);
    return of(true);
  }
}
