import { Inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
 constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string){}

  start(hubUrl:string){
    hubUrl=this.baseSignalRUrl+hubUrl;
      const builder:HubConnectionBuilder=new HubConnectionBuilder();
      const hubConnection:HubConnection= builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
      hubConnection.start()
                    .then(()=>
                      console.log("connected")
                    )
                    .catch(error=>{
                      setTimeout(() => {
                        this.start(hubUrl)
                      }, 2000);
                    });
    hubConnection.onreconnected(connectionId=>console.log("reconnected"));
    hubConnection.onreconnecting(error=>console.log("reConnenting"));
    hubConnection.onclose(error=>console.log("close Connection"));
    return hubConnection;
  }
  //procedureName=> backend e yazdığımız metod a karşılık geliyor --receiveProductAddedMessage
  invoke(hubUrl:string,procedureName:string,message:any,successCallBack?:(value)=>void,errorCallBack?:(value)=>void){
    this.start(hubUrl).invoke(procedureName,message)
                    .then(successCallBack)
                    .catch(errorCallBack)
  }
  on(hubUrl:string,procedureName:string,callBack?:(...message)=>void){
    this.start(hubUrl).on(procedureName,callBack)
  }

}
