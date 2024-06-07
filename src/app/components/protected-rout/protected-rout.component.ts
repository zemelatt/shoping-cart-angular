// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { routes } from '../../app.routes';
import { Observable } from 'rxjs';
import { AUTH_CONFIG } from './auth.config';
import { url } from 'inspector';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = this.getRequiredRoles(route);

    const routePath = this.getFullPath(route);

    if (!AUTH_CONFIG.routeRoles.hasOwnProperty(routePath)) {
    }
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRoles = this.authService.getUserRoles();
    const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));

    if (!isAuthorized) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  private getRequiredRoles(route: ActivatedRouteSnapshot): string[] {
    const defaultRoles = ['null'];
    const routePath = this.getFullPath(route);
    const routeRoles = AUTH_CONFIG.routeRoles[routePath] || [];
    // return [...defaultRoles, ...routeRoles];
    return [...routeRoles];
  }

  private getFullPath(route: ActivatedRouteSnapshot): string {
    let fullPath = '';
    let currentRoute = route;
    while (currentRoute) {
      fullPath = '/' + currentRoute.url.join('/') + fullPath;
      currentRoute = currentRoute.parent;
    }
    fullPath = fullPath.startsWith('/') ? fullPath.substring(1) : fullPath;
    return fullPath;
  }
}
