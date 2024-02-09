import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './../../../../services/common/models/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { AlertifyService, alertifyMessageType, alertifyPosition } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { listUserContract } from 'src/app/contracts/User/listUserContract';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
declare var $:any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent extends BaseComponent implements OnInit{
  displayedColumns: string[] = ['email','userName','nameSurname', 'twoFactorEnabled','assignRole','delete'];
  dataSource:MatTableDataSource<listUserContract>=null;
  constructor(
    
    private userService:UserService,spinner:NgxSpinnerService,
    private alertifyService:AlertifyService,
     private dialogService:DialogService
 
  ){ 
    super(spinner)
  }
  async ngOnInit() {
    await this.GetUsers();
   }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async GetUsers(){
    
    const allUsers:{totalUsersCount:number;users:listUserContract[]}= await this.userService.
    GetAllUsers(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,
      ()=>{
        this.HideSpinner(spinnerType.Timer);

      },
      (errorMessage)=>{
        this.alertifyService.message({
          dismissOthers:true,
          message:errorMessage,
          messageType:alertifyMessageType.Error,
          position:alertifyPosition.TopRight
        })
      });
      console.log(allUsers.users)
      this.dataSource= new MatTableDataSource<listUserContract>(allUsers.users);
      this.paginator.length=allUsers.totalUsersCount;
      
  }

  assignRole(id:string){
    this.dialogService.openDialog({
      ComponentType:AuthorizeUserDialogComponent,
      data:id,
      afterClosed:()=>{ }
    });
  }
  
  async pageChange(){
    await this.GetUsers();
    
    this.paginator.pageIndex,this.paginator.pageSize
  }
  delete(id,event){

    const img:HTMLImageElement=event.srcElement;
    $(img.parentElement.parentElement).fadeOut(1000)
  }

}
