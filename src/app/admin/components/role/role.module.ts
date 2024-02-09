import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:RoleComponent}
    ]),
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,   DeleteDirectiveModule
  ]
})
export class RoleModule { }
