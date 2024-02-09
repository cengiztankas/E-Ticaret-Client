import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseRoleContract } from 'src/app/contracts/Role/responseRoleContract';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }
 async getRoles(size:number,page:number,callBack?:()=>void):Promise<ResponseRoleContract>{
    const observable:Observable<ResponseRoleContract>=this.httpClientService.get<ResponseRoleContract>({
      controller:"roles",
      queryString:`page=${page}&size=${size}`
    })
    const response= await firstValueFrom(observable)
    // callBack();
    return response;
  }
 async createRole(name:string,callBackFun?:()=>void){
  
   const observable:Observable<any>= this.httpClientService.post({
      controller:"roles"
    },{name:name});
    
   const response= await firstValueFrom(observable) as {succeeded:boolean};
   callBackFun();
   return response
  }
  async deleteRole(id:string){
    const Observable:Observable<any>=this.httpClientService.delete({
      controller:"roles"
    },id)
   const asd=  await firstValueFrom(Observable) as {succeeded:boolean}

  }
}
