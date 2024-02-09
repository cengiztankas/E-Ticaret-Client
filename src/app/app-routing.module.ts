import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { authGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path:"admin", component:LayoutComponent,children:[
      {path:"",component:DashboardComponent,canActivate:[authGuard]},
      {path:"authorize-menu",loadChildren:()=>import("./admin/components/authorize-menu/authorize-menu.module").then(module=>module.AuthorizeMenuModule),canActivate:[authGuard]},
      {path:"customers",loadChildren:()=>import("./admin/components/customers/customers.module").then(module=>module.CustomersModule),canActivate:[authGuard]},
      {path:"orders",loadChildren:()=>import("./admin/components/orders/orders.module").then(module=>module.OrdersModule),canActivate:[authGuard]},
      {path:"products",loadChildren:()=>import("./admin/components/products/products.module").then(module=>module.ProductsModule),canActivate:[authGuard]},
      {path:"role",loadChildren:()=>import("./admin/components/role/role.module").then(module=>module.RoleModule),canActivate:[authGuard]},
      {path:"user",loadChildren:()=>import("./admin/components/user/user.module").then(module=>module.UserModule),canActivate:[authGuard]}
    ],canActivate:[authGuard]// authguard araya girip kullanıcının giriş yapıp yapmadığını kontrol ediyor.
  },
  {path:"",component:HomeComponent},
  {path:"baskets",loadChildren:()=>import("./ui/components/baskets/baskets.module").then(module=>module.BasketsModule)  },
  {path:"products",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)  },
  {path:"products/:pageNo",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)  },
  {path:"auth",loadChildren:()=>import("./ui/components/auth/auth.module").then(module=>module.AuthModule)  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
