import { Component, OnChanges, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from './app-service.service';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './store/action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
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
  constructor(
    // private globalService: AppServiceService,
    private store: Store<{ counter: { counter: number } }>
  ) {
    this.getToken();
  }

  getToken(): any {
    const token = localStorage.getItem('auth_token');
    this.login = localStorage.getItem('login');
    if (this.login == 'admin') {
      this.navAuth = true;
    }
    return this.login;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('login');
    this.login = false;
  }

  Onincrement() {
    this.store.dispatch(increment());
  }
  Ondecrement() {
    this.store.dispatch(decrement());
  }
  OnRest() {
    this.store.dispatch(reset());
  }

  ngOnInit() {
    this.noOfProducts = localStorage.getItem('inCart');
    if (this.getToken()) {
      const a = JSON.parse(this.noOfProducts)?.length;
      this.inCart = a;
    }
    this.store.select('counter').subscribe((data) => {
      this.counterDisplay = data.counter;
    });
  }
  ngOnDestroy() {}
}
