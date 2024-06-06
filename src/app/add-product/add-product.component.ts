import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from '../app-service.service';

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
  isEdit: boolean = false;
  editAbleProductId: any = '';
  selectProduct: any;
  editProducts: any;

  constructor(private globalService: AppServiceService) {}

  public userDetails = {
    name: '',
    description: '',
    price: '',
    catagory: '',
    myPhoto: '',
  };

  async allCatagories() {
    this.catagories = await this.globalService.getAllCatagory();
  }

  processFile(imageInput: any) {
    this.userDetails.myPhoto = imageInput.files[0];
  }

  submitForm(userForm: any): any {
    const formData = new FormData();
    formData.append('name', this.userDetails.name);
    formData.append('description', this.userDetails.description);
    formData.append('price', this.userDetails.price);
    formData.append('catagory', this.userDetails.catagory);
    formData.append('myPhoto', this.userDetails.myPhoto);

    if (this.isEdit) {
      this.globalService.updateProduct(formData, this.editAbleProductId);
      userForm.reset();
      this.loadData();
    } else {
      this.isEdit = false;
      this.globalService.newProduct(formData);
      this.loadData();
      userForm.reset();
    }
    this.loadData();
  }

  async editProduct(id: number) {
    const selectProduct = await this.globalService.selectOneProduct(id);
    this.userDetails.name = selectProduct.data[0].title;
    this.userDetails.description = selectProduct.data[0].description;
    this.userDetails.price = selectProduct.data[0].price;
    this.userDetails.catagory = selectProduct.data[0].catagory;
    this.userDetails.myPhoto = selectProduct.data[0].img;
    this.isEdit = true;
    this.editAbleProductId = selectProduct.data[0].id;
  }

  async deleteProduct(id: number) {
    this.globalService.deleteProduct(id);
    this.loadData();
  }

  async ngOnInit() {
    this.allCatagories();
    this.products = await this.globalService.getProducts();
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.products = await this.globalService.getProducts();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
