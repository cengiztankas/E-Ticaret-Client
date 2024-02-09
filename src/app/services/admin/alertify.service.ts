
import { Injectable } from '@angular/core';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  // message(message:string,messageType:alertifyMessageType,position:alertifyPosition,delay:number=3,dismissOthers:boolean=false){

    message(option:Partial<alertifyOption>){
    //delay: süresi,
    //positon:posisyonu
    //dismissOthers:birdenfazla gösterip göstermeyeceği
    alertify.set('notifier','delay', option.delay);
    alertify.set('notifier','position', option.position);
  var msg=  alertify[option.messageType](option.message);
  if(option.dismissOthers){
    msg.dismissOthers();
  }

  }
}
export enum alertifyMessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}
export enum alertifyPosition{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",
  

}
export class alertifyOption{
  message:string;
  messageType:alertifyMessageType;
  position:alertifyPosition=alertifyPosition.BottomRight;
  delay:number=3;
  dismissOthers:boolean=false
}
