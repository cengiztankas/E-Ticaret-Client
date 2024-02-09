import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListOrderComponent } from './list-order.component';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [ListOrderComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    DeleteDirectiveModule
  ],exports:[ListOrderComponent]
})
export class ListOrderModule { }
