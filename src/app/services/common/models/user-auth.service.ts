import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { loginUserContract } from './../../../contracts/User/loginUserContract';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { token } from 'src/app/contracts/Token/token';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from '../../ui/costum-toastr.service';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClienntService:HttpClientService,private toastrService:CostumToastrService) { }



  async login(user:loginUserContract,callBackFunc?:()=>void ):Promise<any>{
    
    const observable:Observable<any|token>= this.httpClienntService.post<any|token>(
      {
        controller:"Auth",
        action:"login"
      },user
    )
    const token:token= await firstValueFrom(observable) as token;
    if(token){
      localStorage.setItem("accessToken",token.token.accessToken)
      localStorage.setItem("refreshToken",token.token.refreshToken)
      this.toastrService.Message({
        message:"Kullanıcı  girişi başarılı",
        title:"Giriş Başarılı",
        messageType:ToastrMessageType.success,position:ToastrPosition.BottomRight})
    }
    
    callBackFunc();
  }
async refreshTokenLogin(refreshToken:string, callBackFunc?:(state:boolean)=>void):Promise<any>{
  debugger
  if(refreshToken!=null){
      const observable:Observable<any|token>=this.httpClienntService.post<any|token>({
        action:"refreshTokenLogin",
        controller:"auth"
      },{refreshToken:refreshToken});
  
   try {
        const _token:token = await firstValueFrom(observable) as token;
        if(token){
          localStorage.setItem("accessToken",_token.token.accessToken)
          localStorage.setItem("refreshToken",_token.token.refreshToken)
        }
        callBackFunc(_token?true:false);
   } catch (error) {
        callBackFunc(false);
   }
  }
  else{
    callBackFunc(false);
  }
}
  async googleLogin(user:SocialUser,callBackFunc?:()=>void):Promise<any>{
      const observable:Observable<SocialUser|token>=this.httpClienntService.post<SocialUser|token>(
        {
          controller:"Auth",
          action:"google-login"
        },user);

    const _token:token =   await firstValueFrom(observable) as token;
    if(_token){
      localStorage.setItem("accessToken",_token.token.accessToken)
      localStorage.setItem("refreshToken",_token.token.refreshToken)

      this.toastrService.Message({
       title:"Google üzerinden giriş başarıyla sağlandı...",message:"Google ile Giriş",messageType:ToastrMessageType.success,
        position:ToastrPosition.BottomRight
      })
      
    }else{
      this.toastrService.Message({
        title:"Google üzerinden giriş başarısız",message:"Google ile Giriş",messageType:ToastrMessageType.error,
        position:ToastrPosition.BottomRight
      })
    }
    callBackFunc();
  }

  async facebookLogin(user:SocialUser,callBackFunc?:()=>void):Promise<any>{
    const observable:Observable<SocialUser|token>=this.httpClienntService.post<SocialUser|token>(
      {
        controller:"Auth",
        action:"facebook-login"
      },user);

  const _token:token =   await firstValueFrom(observable) as token;
  if(_token){
    localStorage.setItem("accessToken",_token.token.accessToken)
    localStorage.setItem("refreshToken",_token.token.refreshToken)

    this.toastrService.Message({
     title:"Facebook üzerinden giriş başarıyla sağlandı...",message:"Facebook ile Giriş",messageType:ToastrMessageType.success,
      position:ToastrPosition.BottomRight
    })
    
  }else{
    this.toastrService.Message({
      title:"Facebook üzerinden giriş başarısız",message:"Facebook ile Giriş",messageType:ToastrMessageType.error,
      position:ToastrPosition.BottomRight
    })
  }
  callBackFunc();
  }
  async passwordReset(email:string,callbackFun?:()=>void){
    const observable:Observable<any>=this.httpClienntService.post({
      controller:"auth",
      action:"password-reset"
    },{email:email})
    await firstValueFrom(observable)
    callbackFun();
  }

  async verifyResetToken(resetToken:string,userId:string,callBackFunc?:()=>void):Promise<boolean>{
   const observable:Observable<any>= this.httpClienntService.post({
      controller:"auth",
      action:"verify-reset-token"
    },{resetToken:resetToken,userId:userId})
    const isState=  await firstValueFrom(observable) 

    callBackFunc();
    return isState.state;
  }
}
