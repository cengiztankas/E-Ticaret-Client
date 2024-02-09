import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { AuthService } from './services/common/auth.service';

import { Component, ViewChild } from '@angular/core';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from './services/ui/costum-toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $:any 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;
  constructor(public authService:AuthService,private toastrService:CostumToastrService,private router:Router,
   private dynamicLoadComponentService:DynamicLoadComponentService,
   private activatedRoute:ActivatedRoute
   ){
 
    authService.identityCheck();
      
    }
      
      

  signOut(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    this.authService.identityCheck();
    this.toastrService.Message({message:"Oturum Kapalı",title:"Oturumunuz Kapatıldı...",messageType:ToastrMessageType.warning, position:ToastrPosition.BottomRight})
    this.router.navigate([""])
  }
  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)
  }
}

