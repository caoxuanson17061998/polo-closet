import { NotificationService } from './shared/notification.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatisticComponent } from './features/statistic/statistic.component';
import { ProductManagementComponent } from './features/product-management/product-management.component';
import { DiscountCodeComponent } from './features/discount-code/discount-code.component';
import { LayoutModule } from './layout/layout.module';
import { UserComponent } from './features/user/user.component';
import { BannerManagementComponent } from './features/banner-management/banner-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DialogProductComponent } from './features/product-management/dialog-product/dialog-product.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from './shared/alert/alert.module';
import { ConfirmDialogModule } from './shared/confirm-dialog/confirm-dialog.module';
import { ConfirmDeleteModule } from './shared/confirm-delete/confirm-delete.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    StatisticComponent,
    ProductManagementComponent,
    DiscountCodeComponent,
    UserComponent,
    BannerManagementComponent,
    DialogProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    AuthModule,
    FormsModule,
    AlertModule,
    ConfirmDialogModule,
    ConfirmDeleteModule,
    MatDialogModule,
  ],
  providers: [AuthService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
