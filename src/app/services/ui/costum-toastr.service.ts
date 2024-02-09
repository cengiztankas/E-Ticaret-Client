
import { Injectable } from '@angular/core';
import {ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CostumToastrService {

  constructor(private toastrService:ToastrService) { }

Message( toastrOptions:Partial<ToastrOptions>){
    this.toastrService[toastrOptions.messageType](toastrOptions.title,toastrOptions.message,{positionClass:toastrOptions.position})
  }
}
export class ToastrOptions{
  message:string;
  title:string;
  messageType:ToastrMessageType;
  position:ToastrPosition
}
export enum ToastrMessageType{
  error= "error",
  info= "info",
  success= "success",
  warning= "warning",
}
export enum ToastrPosition{
  TopRight="toast-top-right",
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  TopLeft="toast-top-left",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width",
  TopCenter="toast-top-center",
  BottomCenter="toast-bottom-center "

}