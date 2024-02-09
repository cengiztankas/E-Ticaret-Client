import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListOrderModule } from './list-order/list-order.module';



@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
     RouterModule.forChild([{path:"",component:OrdersComponent}]),
     ListOrderModule,
     
  ]
})
export class OrdersModule { }
