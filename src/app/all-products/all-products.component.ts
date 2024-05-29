import { Component, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

import { AppServiceService } from '../app-service.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule],
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
  tocart: any;

  constructor(private globalService: AppServiceService) {}

  async addTocart(id: number) {
    const res: any = await this.globalService.getSelectedProduct(id);
    localStorage.setItem('inCart', JSON.stringify(res.data.data));
    this.globalService.setGlobalVariable(res.data.numOfData);
  }

  async ngOnInit() {
    this.products = await this.globalService.getProducts();
  }

  ngOnDestroy() {
    // Unsubscribe or do cleanup if needed
  }
}
