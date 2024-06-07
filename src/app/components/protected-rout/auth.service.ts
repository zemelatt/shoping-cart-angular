// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const loginAuth = localStorage.getItem('login');

    if (loginAuth && token) {
      return true;
    }

    return false;
  }
  getUserRoles(): string[] {
    const roles = localStorage.getItem('login');
    return roles ? roles.split(',') : [];
  }
}
