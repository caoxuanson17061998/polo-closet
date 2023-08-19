import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = '';

  constructor(private router: Router) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        const url = event.url;
        switch (url) {
          case '/statistic':
            this.title = 'Thống kê';
            break;
          case '/order-management':
            this.title = 'Quản lý đơn hàng';
            break;
          case '/product-management':
            this.title = 'Quản lý sản phẩm';
            break;
          case '/discount-code':
            this.title = 'Mã giảm giá';
            break;
          case '/user':
            this.title = 'Người dùng';
            break;
          case '/banner-management':
            this.title = 'Quản lý banner';
            break;
          default:
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/statistic':
        this.title = 'Thống kê';
        break;
      case '/product-management':
        this.title = 'Quản lý sản phẩm';
        break;
      case '/order-management':
        this.title = 'Quản lý đơn hàng';
        break;
      case '/discount-code':
        this.title = 'Mã giảm giá';
        break;
      case '/user':
        this.title = 'Người dùng';
        break;
      case '/banner-management':
        this.title = 'Quản lý banner';
        break;
      default:
        this.title = '';
        break;
    }
  }
}
