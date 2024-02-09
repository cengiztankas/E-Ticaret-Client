
import { ProductService } from '../../../../services/common/models/product.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { CreateProductContract } from 'src/app/contracts/Product/CreateProductContract';
import { AlertifyService, alertifyMessageType } from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent extends BaseComponent  {
  private product:CreateProductContract;
  constructor(private productService:ProductService,spinner:NgxSpinnerService,private alertify:AlertifyService){
    super(spinner)
  } 
  @Output() createProductEvent:EventEmitter<CreateProductContract>=new EventEmitter(); //bir üst componente CreateProductevent gönderdik.
  create(name:HTMLInputElement,stok:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(spinnerType.Timer);
    const p:CreateProductContract=new CreateProductContract();
    p.name=name.value;
    p.stock=parseInt(stok.value);
    p.price=parseFloat(price.value);
    this.productService.createProduct(p,()=>{
      this.HideSpinner(spinnerType.Timer);
      this.alertify.message({message:"Kayıt İşlemi Başarılı",messageType:alertifyMessageType.Success,})
      this.createProductEvent.emit(p);//kayıttan sonra tetikleme yaptık
    }, (message)=>{
      this.alertify.message({message,messageType:alertifyMessageType.Error})
    }
    );
  }
}
