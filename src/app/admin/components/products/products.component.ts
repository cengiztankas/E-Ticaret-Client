import { CreateProductContract } from '../../../contracts/Product/CreateProductContract';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { ListProductComponent } from './list-product/list-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html', 
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService){
    super(spinner)
  }
  ngOnInit(): void { 
   this.showSpinner(spinnerType.Timer);
  }
  @ViewChild(ListProductComponent) listProductComponent:ListProductComponent
  createProductEvent(product:CreateProductContract){
    this.listProductComponent.GetProduct();
  }
  
}
