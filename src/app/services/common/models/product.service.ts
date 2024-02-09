import { Observable, firstValueFrom } from 'rxjs';
import { CreateProductContract } from 'src/app/contracts/Product/CreateProductContract';
import { HttpClientService } from '../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProductContract } from 'src/app/contracts/Product/ListProductContract';
import { ListProductImagesContract } from 'src/app/contracts/Product/ListProductImagesContract';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }
  createProduct(product:Partial<CreateProductContract>,successCallBack?:()=>void,errorCallBack?:(errooMessage:string)=>void){
    
    this.httpClientService.post(
      {controller:"Products"},product
    ).subscribe( c=>{
      successCallBack();
      },(errorResponse:HttpErrorResponse)=>{
          const _error:Array<{key:string,value:Array<string>}>=errorResponse.error;
          let message="";
          _error.forEach((v,index)=>{
            v.value.forEach((_v,_index)=>{
              message+=`${_v} <br>`;
            });
          });
          errorCallBack(message);
        }
    )
  }
  async ReadProduct(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalProductCount:number;products:ListProductContract[]}>{
     const promiseData:Promise<{totalProductCount:number;products:ListProductContract[]}>=this.httpClientService.get<{totalProductCount:number;products:ListProductContract[]}>({
      controller:"Products",
     queryString:`page=${page}&size=${size}`
     }).toPromise(); 
     promiseData.then(
      c=> successCallBack()
     )
     .catch(
      (errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message)
     );
     return await promiseData;
  }
  async DeleteProduct(id:string){
    const DeleteObservable:Observable<any>=this.httpClientService.delete<any>({controller:"Products"},id);
    await firstValueFrom(DeleteObservable);
  }

 async readImagesById(id:string,successCallBack:()=>void):Promise<ListProductImagesContract[]>{
   const getObservable:Observable<ListProductImagesContract[]>= this.httpClientService.get<ListProductImagesContract[]>({
      action:"getProductImages",
      controller:"Products"
    },id);
    const images:ListProductImagesContract[]=await firstValueFrom(getObservable);
    successCallBack();
   return images
  }

  async deleteImage(id:string,imageId:string,successCallBack:()=>void){
    const deleteObservable=this.httpClientService.delete({
      action:"DeleteProductImage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },id);
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
 async changesShowcaseImage(productId:string,imageId:string,successCallBack?:()=>void){
  const observable=this.httpClientService.put({
    action:"ChangeShowcaseImage",
    controller:"products",
    queryString:`ProductId=${productId}&ImageId=${imageId}`
  },{});

    await firstValueFrom(observable);
    successCallBack();
  }
}
