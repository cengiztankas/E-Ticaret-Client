import { AuthorizationEndpointService } from './../../services/common/models/authorization-endpoint.service';
import { ResponseRoleContract } from './../../contracts/Role/responseRoleContract';
import { RoleComponent } from './../../admin/components/role/role.component';
import { AlertifyService, alertifyMessageType } from './../../services/admin/alertify.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import {  role } from 'src/app/contracts/Role/responseRoleContract';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
 
  responseRole:ResponseRoleContract =new ResponseRoleContract();
  listRole:{name:string,selected:boolean}[];
  assignedRoles: Array<string>;

constructor(dialogRef:MatDialogRef<AuthorizeMenuDialogComponent>,
  private roleService:RoleService,
  private alertify:AlertifyService,
  private authorizationEndpointService:AuthorizationEndpointService,
     @Inject(MAT_DIALOG_DATA) public data:AuthorizeMenuState|any,
    private spinner:NgxSpinnerService
     ){
  super(dialogRef)
} 
async  ngOnInit() {
     this.spinner.show(spinnerType.Timer)
 
    this.assignedRoles=await this.authorizationEndpointService.getRolesToEndpoint(this.data.code,this.data.menuName,
      ()=>this.spinner.hide(spinnerType.Timer)
      )

     this.responseRole= await this.roleService.getRoles(-1,-1,()=>{
        this.spinner.hide(spinnerType.Timer)
     })
     debugger
     this.listRole=this.responseRole.datas.map((c:any)=>{
      return{
        name:c.name,
        selected:this.assignedRoles?.indexOf(c.name)>-1
      }
     })
  }
 async assignRoles(RoleComponent:MatSelectionList) {
    const SelectedRoles:string[]=RoleComponent.selectedOptions.selected.map(c=>c._unscopedContent.nativeElement.innerText);
// console.log(RoleComponent.selectedOptions.selected.map(c=>c._unscopedContent.nativeElement))
    await this.authorizationEndpointService.assignRoleEndpoint(SelectedRoles,this.data.code,this.data.menuName,()=>{
      this.alertify.message({
        message:"Roller Başarıyla Atandı",
        messageType:alertifyMessageType.Success
      })
    
   })
  }
}
export enum AuthorizeMenuState{
  yes,no
}
