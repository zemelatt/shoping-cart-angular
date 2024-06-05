import { Component, OnChanges, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppServiceService } from './app-service.service';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './store/counter.action';
import { CommonModule } from '@angular/common';
//pop
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { createPopper } from '@popperjs/core';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CheckoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  message: any;
  inCart: any;
  title = 'shoping-Cart';
  login: any = false;
  noOfProducts: any;
  data: string = '';
  public navAuth: boolean = false;
  public counterDisplay: any;
  public roleDisplay: any;
  public navAuthForUser: boolean = false;
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;
  role: any;
  constructor(private store: Store<{ counter: { counter: any; auth: any } }>) {
    this.getToken();
  }

  getToken(): any {
    const token = localStorage.getItem('auth_token');
    this.login = localStorage.getItem('login');
    this.store.select('counter').subscribe((data) => {
      this.role = data.auth;

      if (this.role == 'admin' || this.login == 'admin') {
        this.navAuth = true;
        this.login = true;
        this.navAuthForUser = false;
        return true;
      }
      this.navAuth = false;
      this.navAuthForUser = true;
      return false;
    });

    return false;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('login');
    this.login = false;
  }

  // Onincrement() {
  //   this.store.dispatch(increment());
  // }
  // Ondecrement() {
  //   this.store.dispatch(decrement());
  // }
  // OnRest() {
  //   this.store.dispatch(reset());
  // }
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      }
    );
  }
  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  ngOnInit() {
    this.noOfProducts = localStorage.getItem('inCart');
    if (this.getToken()) {
      const a = JSON.parse(this.noOfProducts)?.length;
    }
    this.store.select('counter').subscribe((data) => {
      this.inCart = data.counter;
      this.role = data.auth;

      if (this.inCart < 1) {
        this.inCart = JSON.parse(this.noOfProducts)?.length;
      } else {
        this.inCart = data.counter;
      }
    });
  }
  ngOnDestroy() {}
}
