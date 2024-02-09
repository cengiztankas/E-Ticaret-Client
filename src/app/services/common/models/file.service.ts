import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { baseStorageUrlContract } from 'src/app/contracts/File/baseStorageUrlContract';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService:HttpClientService) { }
 async getBaseStorageUrl():Promise<baseStorageUrlContract>{
   const observable:Observable<baseStorageUrlContract>= this.httpClientService.get<baseStorageUrlContract>({
      controller:"Files",
      action:"GetBaseUrl"
    });   
   return await firstValueFrom(observable);
 
  }
}
