import { RoleService } from './../../services/common/models/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSelectionList } from '@angular/material/list';
import { UserService } from 'src/app/services/common/models/user.service';
import { spinnerType } from 'src/app/base/base.component';
import { ListRoleContract } from 'src/app/contracts/Role/ListRoleContract';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit{
constructor(dialogRef:MatDialogRef<AuthorizeUserDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private userService:UserService,
  private roleService:RoleService,
    private spinner:NgxSpinnerService){
  super(dialogRef)
}

roles: { datas: ListRoleContract[], totalCount: number };
assignedRoles: Array<string>;
listRoles: { name: string, selected: boolean }[];
async ngOnInit() {
  this.spinner.show(spinnerType.Timer)
  this.assignedRoles = await this.userService.getRolesToUser(this.data, () => this.spinner.hide(spinnerType.Timer));
console.log(this.assignedRoles);

  this.roles = await this.roleService.getRoles(-1, -1);

  this.listRoles = this.roles.datas.map((r: any) => { 
    return {
      name: r.name,
      selected: this.assignedRoles?.indexOf(r.name) > -1
    }
  });
}

assignRoles(rolesComponent: MatSelectionList) {
  const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._unscopedContent.nativeElement.innerText)
  this.spinner.show(spinnerType.Timer);
  this.userService.assignRoleToUser(this.data, roles,
    () => {
      this.spinner.hide(spinnerType.Timer);
    }, error => {

    })
}
}