import { SharedService } from 'src/app/shared/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../order-management.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input() selectedOrder!: Order;
  detailOrder: any;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.selectedOrder) {
      this.sharedService
        .getDetailOrder(this.selectedOrder._id)
        .pipe(take(1))
        .subscribe(res => {
          this.detailOrder = res.subOrders;
        });
    }
  }
}
