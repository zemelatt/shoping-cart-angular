import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-add-catagory',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-catagory.component.html',
  styleUrl: './add-catagory.component.css',
})
export class AddCatagoryComponent implements OnInit {
  allCAtagory: any;
  oneCatagory: any;
  editAbleCatagoryId: any = '';
  errMsg: string = '';
  succMsg: string = '';
  isSuccMsg: boolean = false;
  isErrMsg: boolean = false;
  isEdit: boolean = false;

  catagoryData = { title: '' };

  constructor(private globalService: AppServiceService) {}
  async ngOnInit() {
    this.allCAtagory = await this.globalService.getAllCatagory();
  }

  async submitCatagory(catagoryForm: any) {
    const title: any = this.catagoryData;
    const id = this.editAbleCatagoryId;

    if (this.isEdit) {
      this.globalService.updateCatagory({ id, title });
      catagoryForm.reset();
      this.loadData();
      return;
    }

    const res = await this.globalService.newCatagory(title);
    if (res?.data?.errMessage) {
      this.isErrMsg = true;
      this.errMsg = res.data.errMessage;
    }
    this.errMsg = '';
    this.isErrMsg = false;
    this.isSuccMsg = true;
    this.succMsg = res.data.successMsg;
    catagoryForm.reset();
    this.loadData();
  }

  async editCatagory(id: any) {
    const oneCatagory = await this.globalService.selectOneCatagory(id);
    this.oneCatagory = oneCatagory.data[0].title;
    this.isEdit = true;
    this.editAbleCatagoryId = oneCatagory.data[0].id;
  }

  deleteCatagory(id: any) {
    this.globalService.deleteCatagory(id);
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.allCAtagory = await this.globalService.getAllCatagory();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
