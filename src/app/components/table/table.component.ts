import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServiceService } from '../../app-service.service';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  public imgUrl = '../../../uploads/';
  @Input() data: any[] = [];
  @Input() column: any[] = [];
  allCAtagory: any;
  oneCatagory: any;
  isEdit: boolean;
  editAbleCatagoryId: any;
  constructor(private globalService: AppServiceService) {
    console.log(this.data);
  }
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  async editCatagory(id: any) {
    this.edit.emit(id);
  }

  async deleteCatagory(id: any) {
    this.delete.emit(id);
  }
  async loadData(): Promise<void> {
    try {
      this.allCAtagory = await this.globalService.getAllCatagory();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
