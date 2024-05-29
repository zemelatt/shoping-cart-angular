import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-catagory',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-catagory.component.html',
  styleUrl: './add-catagory.component.css',
})
export class AddCatagoryComponent implements OnInit {
  public allCAtagory: any;
  public oneCatagory: any;
  public errMsg: string = '';
  public succMsg: string = '';
  public isSuccMsg: boolean = false;
  public isErrMsg: boolean = false;
  public isEdit: boolean = false;
  public editAbleCatagoryId: any = '';
  constructor(
    private globalService: AppServiceService,
    private appService: AppServiceService
  ) {}
  async ngOnInit() {
    this.allCAtagory = await this.globalService.getAllCatagory();
  }
  public catagoryData = {
    title: '',
  };
  async submitCatagory(catagoryForm: any) {
    const title: any = this.catagoryData;
    const id = this.editAbleCatagoryId;

    if (this.isEdit) {
      this.appService.updateCatagory({ id, title });
      catagoryForm.reset();
      this.loadData();
      return;
    } else {
      const res = await this.appService.newCatagory(title);
      if (res?.data?.errMessage) {
        this.isErrMsg = true;
        this.errMsg = res.data.errMessage;
      } else {
        this.errMsg = '';
        this.isErrMsg = false;
        this.isSuccMsg = true;
        this.succMsg = res.data.successMsg;
        catagoryForm.reset();
        this.loadData();
      }
    }
  }
  async editCatagory(id: any) {
    const oneCatagory = await this.appService.selectOneCatagory(id);
    this.oneCatagory = oneCatagory.data[0].title;
    this.isEdit = true;
    this.editAbleCatagoryId = oneCatagory.data[0].id;
  }
  deleteCatagory(id: any) {
    this.appService.deleteCatagory(id);
    this.loadData();
  }
  async loadData(): Promise<void> {
    try {
      const response = await this.appService.getAllCatagory();
      this.allCAtagory = response;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
