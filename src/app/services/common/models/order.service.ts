import { Observable, firstValueFrom } from 'rxjs';
import { CreateOrderContract } from 'src/app/contracts/Order/CreateOrderContract';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { ListOrderContract } from 'src/app/contracts/Order/ListOrderContract';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleOrderContract } from 'src/app/contracts/Order/SingleOrderContract';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async Create(order:CreateOrderContract):Promise<void>{
    const observable:Observable<any>=await this.httpClientService.post({
      controller:"orders",
    },order)

    await firstValueFrom(observable);
  }

  async GetAllOrders(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalOrdersCount:number;orders:ListOrderContract[]}>{

    const observable:Observable<{totalOrdersCount:number;orders:ListOrderContract[]}>=this.httpClientService.get<{totalOrdersCount:number;orders:ListOrderContract[]}>({
      controller:"orders",
     queryString:`page=${page}&size=${size}`
     })
   const promiseData= firstValueFrom(observable) 
     promiseData.then(value=> successCallBack())
     .catch(
      (errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message)
     );
     return await promiseData;
  }
  async getOrderById(id:string){
    const observable:Observable<SingleOrderContract>=this.httpClientService.get<SingleOrderContract>({
      controller:"orders",
      
    },id)
    const promiseData=firstValueFrom(observable)

    return await promiseData;
  }
  async CompleteOrder(orderId:string,successCallBack?:()=>void,errorCallBack?:()=>void){
    const obse:Observable<any>=await this.httpClientService.get({
      controller:"orders",
      action:"complete-order"
    },orderId)
    await firstValueFrom(obse).then(()=>{successCallBack()}).catch(()=>{errorCallBack()})
  }

}
