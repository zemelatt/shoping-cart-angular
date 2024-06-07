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
import { decrement, increment, reset } from './store/counter.action';

//pop

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { createPopper } from '@popperjs/core';

import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
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
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'shoping-Cart';
}
