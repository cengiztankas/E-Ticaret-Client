import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListproductsComponent } from './listproducts/listproducts.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ListproductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:ProductsComponent}])
  ]
})
export class ProductsModule { }
