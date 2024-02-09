import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatchPasword } from 'src/app/Validators/ConfirmedPassword';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { updatePassword } from 'src/app/entities/updatePassword';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/costum-toastr.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit{
  frm:FormGroup;
  state:boolean=false;
constructor(spinner:NgxSpinnerService,private formBuilder:FormBuilder,
  private userAuthService:UserAuthService,private activatedRoute:ActivatedRoute,
  private router:Router,
  private userService:UserService,private toastr:CostumToastrService){
  super(spinner)
}
ngOnInit(): void {
  this.showSpinner(spinnerType.Timer)

this.activatedRoute.params.subscribe({
  next:async params=>{
    const userId:string=params["userId"]
    const resetToken:string=params["resetToken"]
  this.state= await  this.userAuthService.verifyResetToken(resetToken,userId,()=>{

      this.frm=this.formBuilder.group({
        PasswordGroup:this.formBuilder.group({
          password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
          passwordConfirm:["",Validators.required],
        },{validators:[MatchPasword()]}),
        
      });


      this.HideSpinner(spinnerType.Timer)
    })
  }
})

  
}
onSubmit(data:updatePassword){ 
  // debugger
  // if(!frm.valid){
  //   return
  // }
 
  this.activatedRoute.params.subscribe({
    next:async params=>{
      const userId:string=params["userId"]
      const resetToken:string=params["resetToken"]
      await this.userService.updatePassword(data.PasswordGroup.password,resetToken,userId,()=>{
        this.toastr.Message({
          message:"Hata",
          title:"Daha Sonra Tekrar Deneyin",
          messageType:ToastrMessageType.error,
          position:ToastrPosition.BottomRight
        })
      },
      ()=>{
        this.toastr.Message({
          message:"Başarılı",
          title:"Şifre Güncelleme İşleminiz Başarılı",
          messageType:ToastrMessageType.success,
          position:ToastrPosition.BottomRight
        })
        this.router.navigate(["/auth/login"])
      })
    }
   });
  
}
  get _Password(){
    return this.frm.get("PasswordGroup.password");
  }
  get _PasswordGroup(){
    return this.frm.get("PasswordGroup");
  }
  get _passwordConfirm(){
    return this.frm.get("PasswordGroup.passwordConfirm");
  }
}
