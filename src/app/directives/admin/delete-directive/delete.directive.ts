import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, alertifyMessageType, alertifyPosition } from '../../../services/admin/alertify.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { spinnerType } from 'src/app/base/base.component';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import {MatDialog} from '@angular/material/dialog';
import {  deleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
declare var $:any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
  ) {
    const img=_renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/img/delete.png"); //img kendisine attribute verir.
    img.setAttribute("style","cursor:pointer");
    img.setAttribute("class","deleteIcon");
    // img.width=25;
    // img.height=25; //direct değer verir
    _renderer.appendChild(element.nativeElement,img);
    // _renderer.addClass(element.nativeElement,"deleteIcon") element e verir
    

  }
  @Output() callBack:EventEmitter<any>=new EventEmitter();
  @Input() id:string;
  @Input() controller:string;
  @HostListener("click")
  async onclick(){
    this.dialogService.openDialog({
      ComponentType:DeleteDialogComponent,
      data:deleteState.yes,
      afterClosed:()=>{
        this.spinner.show(spinnerType.Timer);
        const td:HTMLTableCellElement=this.element.nativeElement;
          this.httpClientService.delete({
            controller:this.controller
          },this.id).subscribe(()=>{$(td.parentElement).fadeOut(1000,()=>{this.callBack.emit();  
                                                        this.spinner.hide(spinnerType.Timer);
                                                        this.alertifyService.message({
                                                          delay:5,
                                                          message:"Kayıt Silindi",
                                                          messageType:alertifyMessageType.Success,
                                                          dismissOthers:true,
                                                          position:alertifyPosition.TopRight
                                                        })
                                        }
                                        );
              
          },(httpErrorResponse:HttpErrorResponse)=>{
            this.spinner.hide(spinnerType.Timer);                             
            this.alertifyService.message({
              delay:5,
              message:"Bir Hata Oluştu",
              messageType:alertifyMessageType.Error,
              dismissOthers:true,
              position:alertifyPosition.TopRight
            });
          })
      }
    });  
  }

}
