// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const loginAuth = localStorage.getItem('login');
    if (loginAuth == 'admin' && token) {
      return true;
    }

    return false;
    // Check if the user is authenticated (e.g., by checking for a token)
    // Return true if authenticated, false otherwise
  }
}
