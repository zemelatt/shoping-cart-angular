import { Injectable } from '@angular/core';
import { log } from 'node:console';
import { AppServiceService } from './app-service.service';
interface Item {
  id: string;
  title: string;
  qty: number;
  price: string;
  img: string;
}
@Injectable({
  providedIn: 'root',
})
export class CommonFunService {
  allCAtagory: any;
  isEdit: boolean;
  oneCatagory: any;
  editAbleCatagoryId: any;
  constructor(private globalService: AppServiceService) {}
  calculateTotal(item: Item): number {
    const price = parseFloat(item.price);
    const qty = item.qty;
    return price * qty;
  }

  calculateTotalSum(items: Item[]) {
    if (!Array.isArray(items)) {
      throw new Error('Items must be an array.');
    }
    return items.reduce((sum, item) => sum + this.calculateTotal(item), 0);
  }
  async getProductInLocal() {
    const getList = await JSON.parse(localStorage.getItem('inCart') || '[]');
    const checkoutList: any = Object.keys(getList).map((key) => getList[key]);

    return checkoutList;
  }

  check(products: any) {
    const cartItem: any[] = JSON.parse(localStorage.getItem('inCart'));

    products.forEach((product: any) => {
      product.isItemAdded = cartItem.some((item) => item.id == product.id);

      return product.isItemAdded;
    });
  }
}
