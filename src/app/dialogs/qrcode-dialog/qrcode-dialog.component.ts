import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrcodeService } from 'src/app/services/common/models/qrcode.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {
constructor(dialogRef:MatDialogRef<QrcodeDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
    private spinner:NgxSpinnerService,
    private qrcodeService:QrcodeService,
    private domSanitizer:DomSanitizer
  ){
  super(dialogRef)
}
qrCodeSafeUrl:SafeUrl
 async ngOnInit() {
   const qrCodeBlob:Blob=await this.qrcodeService.generateQrCode(this.data)
   const url:string=URL.createObjectURL(qrCodeBlob);
  this.qrCodeSafeUrl=this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
