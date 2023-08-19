import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Thống kê',
      items: [
        {
          label: 'Thống kê',
          icon: 'statistic-icon',
          routerLink: '/statistic',
        },
      ],
    },
    {
      label: 'Quản lý của hàng',
      items: [
        {
          label: 'Quản lý sản phẩm',
          icon: 'product-management-icon',
          routerLink: '/product-management',
        },
        {
          label: 'Quản lý đơn hàng',
          icon: 'product-management-icon',
          routerLink: '/order-management',
        },
        {
          label: 'Mã giảm giá',
          icon: 'discount-icon',
          routerLink: '/discount-code',
        },
        {
          label: 'Người dùng',
          icon: 'user-management-icon',
          routerLink: '/user',
        },
        {
          label: 'Quản lý banner',
          icon: 'banner-icon',
          routerLink: '/banner-management',
        },
      ],
    },
  ];

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onLogout() {
    this.spinner.show();
    this.authService.logout();
  }
}
