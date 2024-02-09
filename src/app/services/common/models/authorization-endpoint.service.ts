import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService:HttpClientService) { }
  async assignRoleEndpoint(roles:string[],code:string,menu:string,callBackFunc?:()=>void,errorCallBack?:()=>void){
   const observable:Observable<any>= this.httpClientService.post({
      controller:"AuthorizationEndpoints"
    },{
      roles:roles,
      code:code,
      menu:menu
    })
    
   await firstValueFrom(observable)
      .then(c=>
        callBackFunc())
      .catch(c=> errorCallBack);

  }

  async getRolesToEndpoint(code: string, menu: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {

    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints",
      action: "GetRolesToEndpoint"
    }, {
      code: code,
      menu: menu
    });

    const promiseData = firstValueFrom(observable);
    
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return (await promiseData).roles;
  }
}
