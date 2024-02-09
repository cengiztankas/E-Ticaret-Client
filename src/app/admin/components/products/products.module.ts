import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FormsModule } from '@angular/forms';

import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { DeleteDirective } from 'src/app/directives/admin/delete-directive/delete.directive';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:ProductsComponent}]),
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    DeleteDirectiveModule
  ]
})
export class ProductsModule { }
