import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,CustomersModule,DashboardModule,OrdersModule,ProductsModule,AuthorizeMenuModule
  ]
})
export class ComponentsModule { }
