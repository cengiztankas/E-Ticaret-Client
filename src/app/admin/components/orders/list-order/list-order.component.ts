import { OrderDetailDialogState } from './../../../../dialogs/order-detail-dialog/order-detail-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { ListOrderContract } from 'src/app/contracts/Order/ListOrderContract';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, alertifyMessageType, alertifyPosition } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
declare var $:any;
@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})

export class ListOrderComponent extends BaseComponent implements OnInit{

  displayedColumns: string[] = ['orderCode', 'username', 'totalPrice', 'createdDate','isCompleted','detail','delete'];
  dataSource:MatTableDataSource<ListOrderContract>=null;
  constructor(
    private orderService:OrderService,spinner:NgxSpinnerService,
    private alertifyService:AlertifyService,
     private dialogService:DialogService

  ){
    super(spinner)
  }
  async ngOnInit() {
    await this.getOrders();
   }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getOrders(){
    
    const allOrders:{totalOrdersCount:number;orders:ListOrderContract[]}= await this.orderService.
    GetAllOrders(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,
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
      console.log(allOrders.orders)
      this.dataSource= new MatTableDataSource<ListOrderContract>(allOrders.orders);
      this.paginator.length=allOrders.totalOrdersCount;
      
  }

  showDetail(id:string){
    this.dialogService.openDialog({
      ComponentType:OrderDetailDialogComponent,
      data:id,
      afterClosed:()=>{ }
    });
  }
  
  async pageChange(){
    await this.getOrders();
    
    this.paginator.pageIndex,this.paginator.pageSize
  }
  delete(id,event){

    const img:HTMLImageElement=event.srcElement;
    $(img.parentElement.parentElement).fadeOut(1000)
  }

}
