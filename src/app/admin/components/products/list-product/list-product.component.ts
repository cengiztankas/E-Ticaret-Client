import { AlertifyService, alertifyMessageType, alertifyPosition } from 'src/app/services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { ListProductContract } from 'src/app/contracts/Product/ListProductContract';
import { MatPaginator } from '@angular/material/paginator';
import { DialogOptions, DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
declare var $:any;
@Component({ 
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends BaseComponent implements OnInit {
   
  displayedColumns: string[] = ['name', 'stok', 'price', 'createdDate','updatedDate','foto','qrCode','edit','delete'];

  dataSource: MatTableDataSource<ListProductContract>=null;
  constructor(
    private productService:ProductService,spinner:NgxSpinnerService,
    private alertifyService:AlertifyService,
     private dialogService:DialogService
    ){
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async GetProduct(){
    this.showSpinner(spinnerType.Timer);
    const allProdcuts:{totalProductCount:number;products:ListProductContract[]}= await this.productService.
    ReadProduct(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,
      ()=>{
        this.HideSpinner(spinnerType.Timer);

      },
      (errorMessage)=>{
        this.alertifyService.message({
          dismissOthers:true,
          message:errorMessage,
          messageType:alertifyMessageType.Error,
          position:alertifyPosition.TopRight
        })
      });
      this.dataSource= new MatTableDataSource<ListProductContract>(allProdcuts.products);
      this.paginator.length=allProdcuts.totalProductCount;
      
     
  }

  async pageChange(){
    await this.GetProduct();
    console.log(this.paginator.pageIndex,this.paginator.pageSize)
  }
  delete(id,event){

    const img:HTMLImageElement=event.srcElement;
    $(img.parentElement.parentElement).fadeOut(1000)
  }
  async ngOnInit() {
   await this.GetProduct();
  }
  AddProductImages(id:string){
    this.dialogService.openDialog({
      ComponentType:SelectProductImageDialogComponent,
      data:id,
      options:{width:"1400px"}
    })
  }

  qrCode(id:string){
    this.dialogService.openDialog({
      ComponentType:QrcodeDialogComponent,
      data:id,
      afterClosed:()=>{}
    })
  }

}
