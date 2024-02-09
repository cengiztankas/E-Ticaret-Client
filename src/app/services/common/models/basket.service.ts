import { Observable, firstValueFrom } from 'rxjs';
import { ListBasketItemContract } from 'src/app/contracts/Basket/list-basket-item-contract';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { CreateBasketItemContract } from 'src/app/contracts/Basket/create-basket-item-contract';
import { createUsertContact } from 'src/app/contracts/User/createUserContract';
import { UpdateBasketItemContract } from 'src/app/contracts/Basket/update-basket-item-contract';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }
  async get():Promise<ListBasketItemContract[]>{
    const observable:Observable<ListBasketItemContract[]>=this.httpClientService.get({
      controller:"baskets"
    })
    return await firstValueFrom(observable)
  }
  async add(product:CreateBasketItemContract,callBackFunc?:()=>void):Promise<void>{
    const observable:Observable<any>=this.httpClientService.post({
      controller:"baskets"
    },product)
    await firstValueFrom(observable)
    callBackFunc();
  }
  async updateQuantity(basketItem:UpdateBasketItemContract,callBackFunc?:()=>void):Promise<void>{
    const observable:Observable<any>=this.httpClientService.put({
      controller:"baskets"
    },basketItem)
    await firstValueFrom(observable)
    callBackFunc();
  }
  
  async remove(BasketItemId:string,callBackFunc?:()=>void):Promise<void>{
    const observable:Observable<any>=this.httpClientService.delete({
      controller:"baskets"
    },BasketItemId)
    await firstValueFrom(observable)
    callBackFunc();
  }
}
