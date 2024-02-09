import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Injectable } from '@angular/core';
import { menuContract } from 'src/app/contracts/ApplicationConfiguration/menu';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) {

   }

 async  GetAuthorizeDefinitionEndpoints():Promise<menuContract[]>{
   const observable:Observable<menuContract[]>= this.httpClientService.get<menuContract[]>({
      controller:"ApplicationServices"
    })

    const data= await firstValueFrom(observable);
    console.log(data)
    return data
   }
}
