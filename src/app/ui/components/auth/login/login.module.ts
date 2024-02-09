import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    
  ]
})
export class LoginModule { }
