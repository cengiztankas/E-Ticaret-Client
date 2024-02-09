import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';
import { UserListComponent } from './user-list.component';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,  
      MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    DeleteDirectiveModule
  ],
  exports:[UserListComponent]
})
export class UserListModule { }
