import { FileUploadOptions } from './../../../services/common/file-upload/file-upload.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Output } from '@angular/core';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit{
  constructor( spinner:NgxSpinnerService){
    super(spinner)
  }
  @Output() _fileUploadOption:Partial<FileUploadOptions>={
    action:"upload",
    controller:"Products",
    isAdminPage:true,
    explanation:"Resimleri Sürükleyin veya Seçin...",
    accept:".png, .jpg, .jpeg, .json"
  } 
  ngOnInit(): void {
    this.showSpinner(spinnerType.Timer)
  }
  
} 
