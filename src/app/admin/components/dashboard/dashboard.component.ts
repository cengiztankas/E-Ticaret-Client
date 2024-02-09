import { HttpClientService } from 'src/app/services/common/http-client.service';
import { HubUrls } from './../../../constants/hub-urls';
import { SignalRService } from './../../../services/common/signalr.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { ReceiveFunction } from 'src/app/constants/receive-function';
import { AlertifyService, alertifyMessageType, alertifyPosition } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService,private alertifyService:AlertifyService,
    private httpClientService:HttpClientService
    ) {
    super(spinner);

  } 
   basketItemId:string="72ed1873-05ba-43e3-bb4d-c67a824d1d46"
  ngOnInit(): void {

    //signalR for product
    this.showSpinner(spinnerType.Timer  )
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunction.ProductAddedMessageReceiveFunction,message=>{
     alert(message)
    })

    //signalR for order
    this.showSpinner(spinnerType.Timer  )
    this.signalRService.on(HubUrls.OrderHub,ReceiveFunction.OrderAddedMessageReceiveFunction,message=>{
     this.alertifyService.message({
      message:message,
      messageType:alertifyMessageType.Notify,
      position:alertifyPosition.BottomCenter, 
     })
    })


  }

}
