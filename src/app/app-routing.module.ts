import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/services/auth.guard';
import { StatisticComponent } from './features/statistic/statistic.component';
import { ProductManagementComponent } from './features/product-management/product-management.component';
import { DiscountCodeComponent } from './features/discount-code/discount-code.component';
import { UserComponent } from './features/user/user.component';
import { BannerManagementComponent } from './features/banner-management/banner-management.component';
import { OrderManagementComponent } from './features/order-management/order-management.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'statistic',
        component: StatisticComponent,
      },
      {
        path: 'product-management',
        component: ProductManagementComponent,
      },
      {
        path: 'order-management',
        component: OrderManagementComponent,
      },
      {
        path: 'discount-code',
        component: DiscountCodeComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'banner-management',
        component: BannerManagementComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
