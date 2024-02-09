import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/costum-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent implements OnInit {
  frm:FormGroup;
  constructor(  spinner:NgxSpinnerService,private formBuilder:FormBuilder,private userAuthService:UserAuthService,
    private toastr:CostumToastrService){
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(spinnerType.Timer)
    this.frm=this.formBuilder.group({
      email:["",[Validators.required,Validators.email,Validators.minLength(5),Validators.maxLength(250)]],
    });
  }
 async onSubmit(frm:FormGroup){
    this.showSpinner(spinnerType.SquareJellyBox)
    await this.userAuthService.passwordReset(frm["email"],()=>{
      this.HideSpinner(spinnerType.SquareJellyBox)
      this.toastr.Message({title:"Şifre Yenileme Linlini Mail Adresinize Başarıyla Gönderdik",
    message:"Mail Gönderme Başarılı",messageType:ToastrMessageType.success,position:ToastrPosition.BottomRight})
    })
  }
  get _email(){
    return this.frm.get("email");
  }

  get _Password(){
    return this.frm.get("password");
  }
  
}
