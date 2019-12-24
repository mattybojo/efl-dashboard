import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAllowedToAccess();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAllowedToAccess();
  }

  private isAllowedToAccess() {
    return this.authService.isAdmin().pipe(
      map(e => {
        if (e) {
          return true;
        } else {
          this.router.navigateByUrl('/dashboard');
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }
}
