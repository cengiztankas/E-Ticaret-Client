import { ListProductImagesContract } from '../../contracts/Product/ListProductImagesContract';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, deleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
 declare $:any;
  constructor(
    dialoRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:SelectProductState|string,
    private spinner:NgxSpinnerService,
    private productService:ProductService,
    private dialogService:DialogService
  )
  {
    super(dialoRef)
  }

  @Output() _fileUploadOption:Partial<FileUploadOptions>={
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"Products",
    isAdminPage:true,
    explanation:"Resimleri Sürükleyin veya Seçin...",
    queryString:`id=${this.data}` 
  }
  images:ListProductImagesContract[];
  async ngOnInit() {
    this.loadingPage();
  }
  async loadingPage(){
    this.spinner.show(spinnerType.Timer);
    this.images=await this.productService.readImagesById(this.data as string,()=>{this.spinner.hide(spinnerType.Timer)});
    
  }
 async deleteImage(imageId:string){
  this.dialogService.openDialog({
    ComponentType:DeleteDialogComponent,
    data:deleteState.yes,
    afterClosed:async()=>{
      this.spinner.show(spinnerType.Timer);
     await this.productService.deleteImage(this.data as string,imageId,()=>{
      this.spinner.hide(spinnerType.Timer);
      
      this.loadingPage();
    })
    }
  })
    
  }

  showCase(imageId:string){
    this.spinner.show(spinnerType.Timer);
    this.productService.changesShowcaseImage(this.data as string,imageId,()=>{
      this.spinner.hide(spinnerType.Timer);
    })
  }
}

export enum SelectProductState{
  Close
}
