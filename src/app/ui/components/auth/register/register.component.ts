import { CostumToastrService, ToastrMessageType, ToastrPosition } from './../../../../services/ui/costum-toastr.service';
import { UserService } from './../../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink ,RouterLinkActive} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatchPasword } from 'src/app/Validators/ConfirmedPassword';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { createUsertContact } from 'src/app/contracts/User/createUserContract';
import { User } from 'src/app/entities/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent  implements OnInit{
  error:any="";
  success:string="";
  frm:FormGroup;
  submitted:boolean=false;
  constructor( spinner:NgxSpinnerService,private formBuilder:FormBuilder,private userService:UserService,private toastrService:CostumToastrService){
    super(spinner)
   
  }
  ngOnInit(): void {
    this.showSpinner(spinnerType.Timer)
    this.frm=this.formBuilder.group({
      nameSurname:["",[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
      userName:["",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email:["",[Validators.required,Validators.email,Validators.minLength(5),Validators.maxLength(250)]],
      PasswordGroup:this.formBuilder.group({
        password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
        passwordConfirm:["",Validators.required],
      },{validators:[MatchPasword()]}),
      
    });
    
  }
  
  
  
  get component(){
    return this.frm.controls;
  }
  get _nameSurname(){
    return this.frm.get("nameSurname");
  }
  get _userName(){
    return this.frm.get("userName");
  }
  get _email(){
    return this.frm.get("email");
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
  

  async onSubmit(data:User) {
    this.showSpinner(spinnerType.Timer);
    if(!this.frm.valid){
      return
    }
   const result:createUsertContact= await this.userService.create(data,()=>  this.showSpinner(spinnerType.Timer))

   
   if(result.success){
    this.toastrService.Message({
      message:"Başarılı", 
      title:result.message,
      messageType:ToastrMessageType.success,
      position:ToastrPosition.TopRight
    })
   }else{
    this.toastrService.Message({
      message:"Error",
      title:result.message,
      messageType:ToastrMessageType.error,
      position:ToastrPosition.TopRight
    })
   }
   
   
  }


}
