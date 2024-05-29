// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Subject } from 'rxjs';
// import axios from 'axios';
// @Injectable({
//   providedIn: 'root',
// })
// export class GlobalService {
//   private globalVariableSubject = new BehaviorSubject<any>(null);
//   globalVariable$ = this.globalVariableSubject.asObservable();

//   constructor() {}
//   setGlobalVariable(value: any) {
//     this.globalVariableSubject.next(value);
//   }

//   getGlobalVariable() {
//     return this.globalVariableSubject.value;
//   }

//   async getProducts(){
//     const res =await axios.get('http://localhost:3000/api/products')
//     const products = res.data;
//     return products
//     }

//     async getSelectedProduct(id: number) {
//       const res:any = await axios.get(`http://localhost:3000/api/add/to/cart/products/${id}`)
//       return res
//      }

   
// }
