import { CompleteOrderDialogComponent, completeOrderState } from './../complete-order-dialog/complete-order-dialog.component';
import { HttpClientService } from './../../services/common/http-client.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrderContract } from 'src/app/contracts/Order/SingleOrderContract';
import { ListBasketItemContract } from 'src/app/contracts/Basket/list-basket-item-contract';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, alertifyMessageType, alertifyPosition } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:OrderDetailDialogState|string,
    private orderService:OrderService,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService,
   private alertfy:AlertifyService
    ){
    super(dialogRef)
  }
  singleOrder: SingleOrderContract=new SingleOrderContract();
  basketItems:ListBasketItemContract[]=[];
  toataPrice:number=0;
  async  ngOnInit():Promise<void> {
   this.singleOrder= await this.orderService.getOrderById(this.data as string)
  this.basketItems=this.singleOrder.basketItems;
  this.toataPrice=this.singleOrder.basketItems.map(c=>c.price*c.quantity).reduce((price,current)=>price+current);
  }


  CompletedOrder(OrderId:any){
    
    this.dialogService.openDialog({
      ComponentType:CompleteOrderDialogComponent,
      data:OrderId,
      afterClosed:async ()=>{
        this.spinner.show(spinnerType.Timer)
    
       await this.orderService.CompleteOrder(OrderId,
          ()=>{
            this.spinner.hide(spinnerType.Timer)
            this.alertfy.message({
              message:"Şipariş Tamamlandı ve Müşteriye Mail Gönderildi",
              position:alertifyPosition.BottomRight,
              messageType:alertifyMessageType.Success
            })
          },
          ()=>{
            this.spinner.hide(spinnerType.Timer)
            this.alertfy.message({
              message:"Şipariş Tamamlanırken Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyin",
              position:alertifyPosition.BottomRight,
              messageType:alertifyMessageType.Warning
            })
          }
        
        )
      }
    })
  }
}
export enum OrderDetailDialogState{yes,no}