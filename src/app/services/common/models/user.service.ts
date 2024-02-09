import { createUsertContact } from './../../../contracts/User/createUserContract';
import { SocialUser } from '@abacritt/angularx-social-login';
import { loginUserContract } from './../../../contracts/User/loginUserContract';
import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { token } from 'src/app/contracts/Token/token';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from '../../ui/costum-toastr.service';
import { Token } from '@angular/compiler';
import { listUserContract } from 'src/app/contracts/User/listUserContract';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClienntService:HttpClientService,private toastrService:CostumToastrService) { }


  async create(user:User,callBackFunc?:()=>void):Promise<createUsertContact>{
    const observable:Observable<createUsertContact|User> =this.httpClienntService.post<createUsertContact|User>(
                                                          {controller:"Users",},user);
          
   const createUser:createUsertContact= await firstValueFrom(observable) as createUsertContact;
    callBackFunc();
    return createUser
  };
  
  async updatePassword(newPassword:string,ResetToken:string,userId:string,callBackErrorFunc?:()=>void,callBackSuccessFunc?:()=>void){
    const observale:Observable<any>=this.httpClienntService.post({
      controller:"Users",
      action:"update-password"
    },{newPassword:newPassword,ResetToken:ResetToken,userId:userId})
    const promiseData=await firstValueFrom(observale).then(c=>{
        callBackSuccessFunc();
    }).catch((err)=>{callBackErrorFunc()})
  
  }

  async GetAllUsers(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalUsersCount:number;users:listUserContract[]}>{

    const observable:Observable<{totalUsersCount:number;users:listUserContract[]}>=this.httpClienntService.get<{totalUsersCount:number;users:listUserContract[]}>({
      controller:"users",
     queryString:`page=${page}&size=${size}`
     })
     
   const promiseData= firstValueFrom(observable) 
     promiseData.then(value=> successCallBack())
     .catch(
      (errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message)
     );
     return await promiseData;
  }
  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClienntService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    await promiseData;
  }

  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<{ roles: string[] }> = this.httpClienntService.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);
    
    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));
    console.log(promiseData);
    
    return (await promiseData).roles;
  }
}
