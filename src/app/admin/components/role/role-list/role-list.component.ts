import { RoleService } from './../../../../services/common/models/role.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
declare var $:any
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends BaseComponent implements OnInit {
   
   displayedColumns: string[] = ['position','id','name','edit','delete'];

  dataSource: MatTableDataSource<any>=null;
  constructor(
    spinner:NgxSpinnerService,
    private alertifyService:AlertifyService, 
     private dialogService:DialogService,
     private roleService:RoleService
    ){
    super(spinner)
  }
  async ngOnInit() {
    await this.GetRole();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async GetRole(){
    this.showSpinner(spinnerType.Timer);
    
     const AllRoles=await this.roleService.getRoles(this.paginator?this.paginator.pageSize:5,this.paginator?this.paginator.pageIndex:0,()=>{})
      this.dataSource= new MatTableDataSource<any>(AllRoles.datas);
      this.paginator.length=AllRoles.totalCount;
      

  }

  async pageChange(){
    await this.GetRole();
    // console.log(this.paginator.pageIndex,this.paginator.pageSize)
  }
  delete(id,event){

    const img:HTMLImageElement=event.srcElement;
    $(img.parentElement.parentElement).fadeOut(1000)
  }
 
 

}
