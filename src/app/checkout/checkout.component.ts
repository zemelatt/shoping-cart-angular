import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { CommonFunService } from '../common-fun.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  public checkoutList!: any;
  public reconstructedObject: any;
  public imgUrl: any = '../../uploads/';
  public overAllSum!: number;
  constructor(
    private globalService: AppServiceService,
    private commonFunService: CommonFunService
  ) {}

  async addQty(id: any) {
    this.checkoutList = await this.commonFunService.getProductInLocal();
    this.checkoutList = this.checkoutList.map(
      (item: { id: any; qty: number }) => {
        if (item.id === id) {
          item.qty += 1;
        }
        return item;
      }
    );
    localStorage.setItem('inCart', JSON.stringify(this.checkoutList));
    this.checkoutList = await this.commonFunService.getProductInLocal();
    this.overAllSum = this.commonFunService.calculateTotalSum(
      this.checkoutList
    );
  }
  async minusQty(id: any) {
    this.checkoutList = await this.commonFunService.getProductInLocal();
    this.checkoutList = this.checkoutList.map(
      (item: { id: any; qty: number }) => {
        if (item.id === id) {
          item.qty -= 1;
        }
        return item;
      }
    );
    this.checkoutList = this.checkoutList.filter(
      (item: { qty: number }) => item.qty > 0
    );

    localStorage.setItem('inCart', JSON.stringify(this.checkoutList));
    this.checkoutList = await this.commonFunService.getProductInLocal();
    this.overAllSum = this.commonFunService.calculateTotalSum(
      this.checkoutList
    );
  }

  async ngOnInit() {
    const getList = JSON.parse(localStorage.getItem('inCart') || '[]');
    this.checkoutList = await this.commonFunService.getProductInLocal();
    this.overAllSum = this.commonFunService.calculateTotalSum(
      this.checkoutList
    );
  }
}
