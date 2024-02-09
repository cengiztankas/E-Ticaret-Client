import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
 constructor(private spinner:NgxSpinnerService){

 }
 showSpinner(name:spinnerType){
  this.spinner.show(name);
  setTimeout(() => {
    this.spinner.hide(name)
  }, 1000); 
 }
 HideSpinner(name:spinnerType){
  this.spinner.hide(name)
 }
}
export enum spinnerType{
  Pacman="s1",
  Timer="s2",
  SquareJellyBox="s3"
}