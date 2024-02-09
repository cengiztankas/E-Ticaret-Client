import {  FileUploadDialogComponent, UpladFileState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { alertifyPosition } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, alertifyMessageType } from '../../admin/alertify.service';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from '../../ui/costum-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  
})
export class FileUploadComponent {
  
  constructor(
    private alertifyService:AlertifyService,
    private toastrService:CostumToastrService,
    private httpClientService:HttpClientService,
    private dialog: MatDialog,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService
    ){}

  @Input() fileUploadOption:Partial<FileUploadOptions>

  public files: NgxFileDropEntry[];
  alertMesage:string="Dosya Başarıyla Yüklendi.";
  alertErrorMessage:string="Bir Hata Oluştu."
  public SelectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData:FormData = new FormData();
   
    for(const oneFile of files) {
      const fileEntry = oneFile.fileEntry as FileSystemFileEntry; 
      fileEntry.file((_file:File)=>{
        formData.append(_file.name,_file,fileEntry.fullPath);
      })
    }

    this.dialogService.openDialog({
      ComponentType:FileUploadDialogComponent,
      data:UpladFileState.yes,
      afterClosed:()=>{  
        console.log("sadfsdf")
              this.spinner.show(spinnerType.Timer);
              this.httpClientService.post({
              controller:this.fileUploadOption.controller,
              action:this.fileUploadOption.action,
              queryString:this.fileUploadOption.queryString,
              headers:new HttpHeaders({"responseType": "blob"})
            },formData).subscribe(data=>{
              this.spinner.hide(spinnerType.Timer);
              if(this.fileUploadOption.isAdminPage){
                this.alertifyService.message(
                  {message:this.alertMesage,dismissOthers:true,messageType:alertifyMessageType.Success,position:alertifyPosition.TopRight}
                )
              }else{
                this.toastrService.Message({message:this.alertMesage,messageType:ToastrMessageType.success,position:ToastrPosition.TopRight})
              }
            },(erorrResponse:HttpErrorResponse)=>{
              this.spinner.hide(spinnerType.Timer);
              if(this.fileUploadOption.isAdminPage){
                this.alertifyService.message(
                  {message:this.alertErrorMessage,dismissOthers:true,messageType:alertifyMessageType.Error,position:alertifyPosition.TopRight}
                )
              }else{
                this.toastrService.Message({message:this.alertErrorMessage,messageType:ToastrMessageType.error,position:ToastrPosition.TopRight})
              }
            })
        }
    });
    
   
  }

  // openDialog(afterClose:any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width:"500px",
  //     height:"250px",
  //     data:UpladFileState.yes,
      
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result==UpladFileState.yes){
  //       afterClose();
  //     }
  //   });
  // }



}

export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
isAdminPage?:boolean=false;
} 