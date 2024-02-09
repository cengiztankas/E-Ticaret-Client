import { AuthService } from './../../services/common/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/costum-toastr.service';

@Injectable({
  providedIn:'root'
})
export class authGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router,private toastrService:CostumToastrService,
        private spinner:NgxSpinnerService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
     
    this.spinner.show(spinnerType.Timer)
    this.authService.identityCheck();
    if(!_isAuthenticated){
      this.router.navigate(["auth/login"],{queryParams:{ReturnUrl:state.url}}) //login sayfasına giderken bulunduğu konumun url sini gönderiyoruz.
     
      this.toastrService.Message({message:"Oturum Açmanız Gerekiyor.",messageType:ToastrMessageType.info,position:ToastrPosition.TopRight})
    }
    this.spinner.hide(spinnerType.Timer)
    return true;
  }

}
