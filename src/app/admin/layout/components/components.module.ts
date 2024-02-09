import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { SidebarModule } from './sidebar/sidebar.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

      ],
  imports: [
    CommonModule,SidebarModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    
   SidebarComponent
    
  ]
})
export class ComponentsModule { }
