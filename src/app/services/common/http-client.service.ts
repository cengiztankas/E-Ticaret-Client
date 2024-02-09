import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,@Inject("baseUrl")private baseUrl:string) { }


  private urlfunc(requestParamerts:Partial<RequestParamerts>){
    let url:string="";
    if(requestParamerts.fullEndPoint)
      return url=requestParamerts.fullEndPoint;
    else
      return `${requestParamerts.baseUrl?requestParamerts.baseUrl:this.baseUrl}/${requestParamerts.controller}${requestParamerts.action?`/${requestParamerts.action}`:""}`
  }


  get<T>(requestParamerts:Partial<RequestParamerts>,id?:string):Observable<T>{
    let url:string="";
      
     url=`${this.urlfunc(requestParamerts)}${id?`/${id}`:""}${requestParamerts.queryString?`?${requestParamerts.queryString}`:""}`;
      
     return this.httpClient.get<T>(url,{headers:requestParamerts.headers,responseType:requestParamerts.responseType as 'json'});
  }
  post<T>(requestParamerts:Partial<RequestParamerts>,body:Partial<T>):Observable<T>{
    let url:string=`${this.urlfunc(requestParamerts)}${requestParamerts.queryString?`?${requestParamerts.queryString}`:""}`;
    return this.httpClient.post<T>(url,body,{headers:requestParamerts.headers,responseType:requestParamerts.responseType as 'json'})
  }
  put<T>(requestParamerts:Partial<RequestParamerts>,body:Partial<T>):Observable<T>{
    let url:string=`${this.urlfunc(requestParamerts)}${requestParamerts.queryString?`?${requestParamerts.queryString}`:""}`;
    return this.httpClient.put<T>(url,body,{headers:requestParamerts.headers,responseType:requestParamerts.responseType as 'json'})
  }
  delete<T>(requestParamerts:Partial<RequestParamerts>,id:string):Observable<T>{
    let url:string=`${this.urlfunc(requestParamerts)}/${id}${requestParamerts.queryString?`?${requestParamerts.queryString}`:""}`;
    console.log(url)
    return this.httpClient.delete<T>(url,{headers:requestParamerts.headers,responseType:requestParamerts.responseType as 'json'})
  
  }
}
export class RequestParamerts{
  controller?:string;
  action?:string;
  // page?:number;
  // size:number;
  queryString:string;

  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;
  responseType?:string;
}
