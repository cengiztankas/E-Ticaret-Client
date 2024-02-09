import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    RouterLink

  ],
  exports:[UpdatePasswordComponent]
})
export class UpdatePasswordModule {
    
 }
