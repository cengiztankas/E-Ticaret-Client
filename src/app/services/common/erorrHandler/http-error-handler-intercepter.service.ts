import { CostumToastrService } from './../../ui/costum-toastr.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { UserAuthService } from '../models/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrMessageType, ToastrPosition } from '../../ui/costum-toastr.service';
import { spinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerIntercepterService implements HttpInterceptor {

  constructor(private toastrService: CostumToastrService, private userAuthService: UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:

        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
          if (!state) {
            const url = this.router.url;
            if (url == "/products")
              this.toastrService.Message({
            message:"Oturum Açınız!",
            title:"Sepete ürün eklemek için oturum açmanız gerekiyor.",
                messageType: ToastrMessageType.warning,
                position: ToastrPosition.TopRight
              });

          }
        }).then(data => {
            //   this.toastrService.Message ({title:"Bu işlemi yapmaya yetkiniz bulunmamaktadır!", message:"Yetkisiz işlem!",
            //   messageType: ToastrMessageType.warning,
            //   position:ToastrPosition.BottomFullWidth
            // });
        });
        break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.Message ({title:"Sunucuya erişilmiyor!", message:"Sunucu hatası!",
            messageType: ToastrMessageType.warning,
            position:ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.Message({title:"Geçersiz istek yapıldı!",message: "Geçersiz istek!", 
            messageType: ToastrMessageType.warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.Message({title:"Sayfa bulunamadı!", message:"Sayfa bulunamadı!",
            messageType: ToastrMessageType.warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        default:
          this.toastrService.Message({title:"Beklenmeyen bir hata meydana gelmiştir!",message: "Hata!", 
            messageType: ToastrMessageType.warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
      }

      this.spinner.hide(spinnerType.Pacman);
      return of(error);
    }));
  }
}


// notlar
//appModule=>{provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerIntercepterService,multi:true}