import { AuthService } from './../../../../services/common/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { loginUserContract } from 'src/app/contracts/User/loginUserContract';
import { UserService } from 'src/app/services/common/models/user.service';
import { SocialAuthService ,SocialUser,FacebookLoginProvider,GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  error:string="";
  success:string="";
  frm:FormGroup;
  constructor(
    spinner:NgxSpinnerService,private formBuilder:FormBuilder ,
     private userAuthService:UserAuthService,private authService:AuthService,
     private activedRoute:ActivatedRoute,
     private router:Router,
     private socialAuthService:SocialAuthService
     ){
    super(spinner)
    this.socialAuthService.authState.subscribe(async(user:SocialUser)=>{
      this.showSpinner(spinnerType.SquareJellyBox);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user,()=>{ authService.identityCheck();})
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
              this.authService.identityCheck();
              this.HideSpinner(spinnerType.SquareJellyBox);
            })
          break

      }
    
       
        this.activedRoute.queryParams.subscribe(params=>{
          const returnUrl=params["ReturnUrl"];
          if(returnUrl){
            this.router.navigate([returnUrl]);
          }else{
            this.router.navigate([""])
          }
        }) 
    })

  }

  ngOnInit(): void {
    this.showSpinner(spinnerType.Timer)
    this.frm=this.formBuilder.group({
      email:["",[Validators.required,Validators.email,Validators.minLength(5),Validators.maxLength(250)]],
      password:["",[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
    });
    

  }
   
  async onSubmit(data:loginUserContract){  
    this.showSpinner(spinnerType.Timer)
    if(this.frm.invalid){
      return
    }
    const result=await this.userAuthService.login(data,()=> {
      this.authService.identityCheck(),
      this.activedRoute.queryParams.subscribe(params=>{
        const returnUrl=params["ReturnUrl"];
        if(returnUrl){
          this.router.navigate([returnUrl]);
        }else{
          this.router.navigate([""])
        }
      })
      this.HideSpinner(spinnerType.Timer)
    }
   )
    
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    debugger
  }
  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  get _email(){
    return this.frm.get("email");
  }

  get _Password(){
    return this.frm.get("password");
  }

}
