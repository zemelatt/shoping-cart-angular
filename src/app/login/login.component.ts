import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppServiceService } from '../app-service.service';
import { auth } from '../store/counter.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent implements OnInit {
  userDetails = { userName: '', email: '', password: '', confirmPassword: '' };
  tokenKey = 'auth_token';
  register = false;
  errMessage: string = '';
  isEmailErr: boolean = false;
  emailErr: string = '';

  constructor(
    private router: Router,
    private appService: AppServiceService,
    private store: Store<{ auth: { auth: any } }>
  ) {}

  toRegister() {
    this.register = !this.register;
  }

  async submitForm(userForm: NgForm) {
    const { userName, email, password, confirmPassword } = this.userDetails;

    if (this.register == false) {
      const fromService = await this.appService.login({ email, password });
      if (fromService.data.token == null) {
        this.errMessage = fromService.data.errMessage;
        return;
      }

      localStorage.setItem(this.tokenKey, fromService.data.token);
      localStorage.setItem('login', fromService.data.role);
      this.router.navigate(
        fromService.data.role == 'admin' ? ['/add-catagory'] : ['/all-products']
      );

      this.store.dispatch(auth({ role: fromService.data.role }));
    }

    if (password == confirmPassword) {
      const addNewUserFromService = await this.appService.newUser({
        userName,
        email,
        password,
      });

      this.emailErr = addNewUserFromService.data.errMessage;
      this.isEmailErr = true;

      if (addNewUserFromService.status == 201) {
        this.register = false;
        userForm.reset();
      }
    }
    this.errMessage = 'password inputs should be the same with confirm input';
  }
  ngOnInit(): void {}
}
