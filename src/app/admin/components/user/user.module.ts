import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { UserListModule } from './user-list/user-list.module';



@NgModule({
  declarations: [
    UserComponent,
    
  ],
  imports: [
    CommonModule,
    UserListModule,
    RouterModule.forChild([{path:"",component:UserComponent}])
  ]
})
export class UserModule { }
