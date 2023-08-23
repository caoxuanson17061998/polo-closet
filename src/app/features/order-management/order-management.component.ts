import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';
import { SharedService } from 'src/app/shared/shared.service';

export enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

export interface Order {
  _id: string;
  userId: string;
  fullname: string;
  numberphone: string;
  address: string;
  status: Status;
  idpromotion?: any;
  originalPrice: number;
  discountedPrice: number;
}

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  keyword: string | null = null;

  Status = Status;

  selectedOrder!: Order;

  isShowAcceptOrder = false;
  isShowCancelOrder = false;
  isShowDetailDialog = false;

  get totalOrders(): number {
    if (this.keyword) {
      return this.orders.filter(order =>
        order.fullname
          .toLowerCase()
          .includes(String(this.keyword).trim().toLowerCase())
      ).length;
    }
    return this.orders.length;
  }

  get ordersByCondition(): Order[] {
    if (Array.isArray(this.orders) && this.orders.length) {
      let orders = this.orders;
      if (this.keyword) {
        this.currentPage = 1;
        orders = this.orders.filter(order =>
          order.fullname
            .toLowerCase()
            .includes(String(this.keyword).trim().toLowerCase())
        );
      }
      return orders.slice(
        this.startOrder - 1,
        this.startOrder + this.rowsPerPage - 1
      );
    }
    return [];
  }

  get startOrder(): number {
    return (this.currentPage - 1) * this.rowsPerPage + 1;
  }

  get lastPage(): number {
    return Math.ceil(this.totalOrders / this.rowsPerPage);
  }

  rowsPerPage = 5;
  currentPage = 1;

  constructor(
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.sharedService
      .getOrders()
      .pipe(take(1))
      .subscribe(res => {
        if (res.orders && res.orders.length) {
          this.orders = res.orders.map((order: any) => {
            return {
              ...order,
              userId: order.iduser?._id,
              fullname: order.iduser?.fullname,
              numberphone: order.iduser?.numberphone,
              address: order.iduser?.address,
              promotionName: order.idpromotion?.title,
            };
          });
        }
      });
  }

  changeRowsPerPage(event: { originalEvent: PointerEvent; value: number }) {
    this.rowsPerPage = event.value;
  }

  onChangePage(typeChange: 'previous' | 'next') {
    if (typeChange === 'previous') {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage--;
    } else if (typeChange === 'next') {
      if (this.currentPage === Math.ceil(this.totalOrders / this.rowsPerPage)) {
        return;
      }
      this.currentPage++;
    }
  }

  onSearch(event: any) {
    this.keyword = event.target.value;
  }

  onShowAcceptDialog(order: Order) {
    this.isShowAcceptOrder = true;
    this.selectedOrder = order;
  }

  onShowCancelDialog(order: Order) {
    this.isShowCancelOrder = true;
    this.selectedOrder = order;
  }

  onCloseDialog() {
    this.isShowAcceptOrder = false;
    this.isShowCancelOrder = false;
  }

  onAcceptOrder() {
    if (this.selectedOrder) {
      this.spinner.show();
      this.sharedService
        .updateStatusOrder(this.selectedOrder._id, {
          status: Status.Delivered,
        })
        .pipe(take(1))
        .subscribe({
          next: res => {
            this.notificationService.success(res.message);
            this.onCloseDialog();
            this.ngOnInit();
          },
        });
    }
  }

  onCancelOrder() {
    if (this.selectedOrder) {
      this.spinner.show();
      this.sharedService
        .updateStatusOrder(this.selectedOrder._id, {
          status: Status.Canceled,
        })
        .pipe(take(1))
        .subscribe({
          next: res => {
            this.notificationService.success(res.message);
            this.onCloseDialog();
            this.ngOnInit();
          },
        });
    }
  }

  onShowDetailOrder(order: Order) {
    this.selectedOrder = order;
    this.isShowDetailDialog = true;
  }
}
