import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

//pop

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { createPopper } from '@popperjs/core';

import { CheckoutComponent } from '../../pages/checkout/checkout.component';

@Component({
  selector: 'app-nav-bar',
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
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavBarComponent {
  message: any;
  inCart: any;
  noOfProducts: any;
  role: any;
  counterDisplay: any;
  roleDisplay: any;

  login: any = false;
  navAuth: boolean = false;
  navAuthForUser: boolean = false;
  dropdownPopoverShow: boolean = false;

  title = 'shoping-Cart';
  data: string = '';

  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

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
