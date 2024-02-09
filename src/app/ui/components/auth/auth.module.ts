import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    // LoginModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule,
    RouterModule.forChild([
      {path:"login",component:LoginComponent},
      {path:"register",component:RegisterComponent},
     {path:"password-reset",component:PasswordResetComponent},
     {path:"password-update/:userId/:resetToken",component:UpdatePasswordComponent}
    ])
  ]
})
export class AuthModule { }
