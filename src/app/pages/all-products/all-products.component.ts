import { Component, Injectable } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { toCart } from '../../store/counter.action';

import { AppServiceService } from '../../app-service.service';
import { CommonFunService } from '../../common-fun.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CurrencyPipe],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class AllProductsComponent {
  private globalVariableSubject = new BehaviorSubject<any>(null);
  globalVariable$ = this.globalVariableSubject.asObservable();
  imgBaseUrl = '../../uploads/';
  products: any[] = [];
  isItemAdded: boolean = false;
  productId: any;

  constructor(
    private globalService: AppServiceService,
    private store: Store<{ counter: { counter: any; auth: any } }>,
    private commonFunctionService: CommonFunService
  ) {}

  async addTocart(id: number) {
    this.productId = id;
    const res: any = await this.globalService.getSelectedProduct(id);
    localStorage.setItem('inCart', JSON.stringify(res.data.data));
    this.store.dispatch(toCart({ value: res.data.numOfData }));
    this.commonFunctionService.check(this.products);
  }

  async ngOnInit() {
    this.products = await this.globalService.getProducts();
    this.commonFunctionService.check(this.products);
  }

  ngOnDestroy() {}
}
