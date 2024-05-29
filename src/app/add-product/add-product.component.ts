import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppServiceService } from '../app-service.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, withFetch, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [],
})
export class AddProductComponent implements OnInit {
  catagories: any;
  products: any;
  imgUrl: any = '../../uploads/';
  public isEdit: boolean = false;
  public editAbleProductId: any = '';
  public selectProduct: any;
  public editProducts: any;

  constructor(
    private http: HttpClient,
    private appService: AppServiceService
  ) {}

  public userDetails = {
    name: '',
    description: '',
    price: '',
    catagory: '',
    myPhoto: '',
  };
  async allCatagories() {
    this.catagories = await this.appService.getAllCatagory();
  }
  processFile(imageInput: any) {
    this.userDetails.myPhoto = imageInput.files[0];
  }

  submitForm(userForm: any): any {
    if (userForm.valid) {
      // console.log('Form data:', this.userDetails);
    }

    const formData = new FormData();
    formData.append('name', this.userDetails.name);
    formData.append('description', this.userDetails.description);
    formData.append('price', this.userDetails.price);
    formData.append('catagory', this.userDetails.catagory);
    formData.append('myPhoto', this.userDetails.myPhoto);
    if (this.isEdit) {
      console.log(formData);

      this.appService.updateProduct(formData, this.editAbleProductId);
      this.loadData();
      userForm.reset();
    } else {
      this.isEdit = false;
      this.appService.newProduct(formData);

      userForm.reset();
      this.loadData();
    }
  }

  async editProduct(id: number) {
    const selectProduct = await this.appService.selectOneProduct(id);

    this.userDetails.name = selectProduct.data[0].title;
    this.userDetails.description = selectProduct.data[0].description;
    this.userDetails.price = selectProduct.data[0].price;
    this.userDetails.catagory = selectProduct.data[0].catagory;
    this.userDetails.myPhoto = selectProduct.data[0].img;
    this.isEdit = true;
    this.editAbleProductId = selectProduct.data[0].id;
  }
  async deleteProduct(id: number) {
    this.appService.deleteProduct(id);
    this.loadData();
  }
  async ngOnInit() {
    this.allCatagories();
    this.products = await this.appService.getProducts();
    this.loadData();
  }
  async loadData(): Promise<void> {
    try {
      this.products = await this.appService.getProducts();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
