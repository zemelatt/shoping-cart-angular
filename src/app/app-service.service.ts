import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService implements OnInit {
  private globalVariableSubject = new BehaviorSubject<any>(null);
  globalVariable$ = this.globalVariableSubject.asObservable();

  constructor() {}
  setGlobalVariable(value: any) {
    this.globalVariableSubject.next(value);
  }
  getGlobalVariable() {
    return this.globalVariableSubject.value;
  }
  async getProducts() {
    const res = await axios.get('http://localhost:3000/api/products');
    const products = res.data;
    return products;
  }
  async getSelectedProduct(id: number) {
    const res: any = await axios.get(
      `http://localhost:3000/api/add/to/cart/products/${id}`
    );
    return res;
  }

  login(formData: any) {
    const res = axios.post(`http://localhost:3000/api/login`, formData);
    return res;
  }
  newUser(formData: any) {
    const newUser = axios.post(`http://localhost:3000/api/new/user`, formData);
    return newUser;
  }

  newProduct(formData: any) {
    const newProductPost = axios.post(
      `http://localhost:3000/api/add/products`,
      formData
    );
    return newProductPost;
  }
  async getAllCatagory() {
    const catagorys = await axios.get(`http://localhost:3000/api/all/catagory`);

    return catagorys?.data;
  }
  async selectOneCatagory(id: any) {
    const oneCatagory = axios.get(
      `http://localhost:3000/api/add/catagory/${id}`
    );
    return oneCatagory;
  }
  newCatagory(formData: string) {
    const newCatagory = axios.post(
      `http://localhost:3000/api/add/catagory`,
      formData
    );
    return newCatagory;
  }
  updateCatagory(obj: any) {
    const { id, title } = obj;
    axios.put(`http://localhost:3000/api/edit/catagory/${id}`, title);
  }
  deleteCatagory(id: number) {
    axios.delete(`http://localhost:3000/api/delete/catagory/${id}`);
  }
  //product
  selectOneProduct(id: number) {
    return axios.get(`http://localhost:3000/api/products/${id}`);
  }
  updateProduct(obj: any, id: number) {
    console.log(obj);

    axios.put(`http://localhost:3000/api/edit/product/${id}`, obj);
  }
  deleteProduct(id: Number) {
    console.log(id);

    axios.delete(`http://localhost:3000/api/delete/product/${id}`);
  }
  ngOnInit(): void {
    this.getAllCatagory();
  }
}
