import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private httpClientService:HttpClientService) { }

 async generateQrCode(productId:string){

    const observable:Observable<Blob>=this.httpClientService.get<Blob>({
      controller:"products",
      action:"qrcode",
      responseType:"blob" //dosya olduğunu söylüyoruz
    },productId)
   return await firstValueFrom(observable)
  }
}
