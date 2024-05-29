import { Component, Injectable, Injector, OnInit } from '@angular/core';
import {
  HttpClient,
  withFetch,
  provideHttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

import { AppServiceService } from '../app-service.service';

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
  public userDetails = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  private tokenKey = 'auth_token';
  public register = false;
  public errMessage: string = '';
  public isEmailErr: boolean = false;
  public emailErr: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private appService: AppServiceService
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
      console.log(fromService.data);

      localStorage.setItem(this.tokenKey, fromService.data.token);
      localStorage.setItem('login', fromService.data.role);
      this.router.navigate(['/all-products']);
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
        this.errMessage;
        this.register = false;
        userForm.reset();
      }
    }
    this.errMessage = 'password inputs should be the same with confirm input';
  }
  ngOnInit(): void {
    console.log('log');
  }
}
