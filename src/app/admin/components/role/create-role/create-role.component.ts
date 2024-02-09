import { AlertifyService, alertifyMessageType, alertifyPosition } from 'src/app/services/admin/alertify.service';
import { RoleService } from './../../../../services/common/models/role.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private roleService:RoleService,private alertifyService:AlertifyService){
    super(spinner)
  }
  @Output() _createRoleEmit:EventEmitter<any>=new EventEmitter();
  create(roleName:string) {
    if(roleName!=null||roleName!="")
    {
      
          this.showSpinner(spinnerType.Timer)
          this.roleService.createRole(roleName,()=>{
            this.showSpinner(spinnerType.Timer)
            this.alertifyService.message({
              message:"Kayıt Başarılı",
              messageType:alertifyMessageType.Success,
              position:alertifyPosition.BottomRight
              
            })
            debugger
              this._createRoleEmit.emit()
          })
        
    }
  }
}
