import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  products: any[] = [];

  keyword = null;

  selectedProduct = null;

  get totalProducts() {
    if (this.keyword) {
      return this.products.filter(product =>
        product.name.includes(String(this.keyword))
      ).length;
    }
    return this.products.length;
  }

  get productsByCondition() {
    if (Array.isArray(this.products) && this.products.length) {
      let products = this.products;
      if (this.keyword) {
        this.currentPage = 1;
        products = this.products.filter(product =>
          product.name
            .toLowerCase()
            .includes(String(this.keyword).toLowerCase())
        );
      }
      return products.slice(
        this.startOrder - 1,
        this.startOrder + this.rowsPerPage - 1
      );
    }
    return [];
  }

  get startOrder() {
    return (this.currentPage - 1) * this.rowsPerPage + 1;
  }

  get lastPage() {
    return Math.ceil(this.totalProducts / this.rowsPerPage);
  }

  rowsPerPage = 5;
  currentPage = 1;

  isShowDialog = false;

  constructor(
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.sharedService.getProducts().subscribe(res => {
      this.products = res.products;
    });
  }

  onEditProduct(product: any) {
    console.log(product);
    this.selectedProduct = product;
  }

  onDeleteProduct(product: any) {
    this.spinner.show();
    this.sharedService.deleteProduct(product._id).subscribe({
      next: res => {
        this.notificationService.success(res.message);
        this.ngOnInit();
      },
      error: error => {
        this.notificationService.error('Xóa sản phẩm không thành công');
      },
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
      if (
        this.currentPage === Math.ceil(this.totalProducts / this.rowsPerPage)
      ) {
        return;
      }
      this.currentPage++;
    }
  }

  onAddProduct() {
    this.isShowDialog = true;
  }

  onCloseDialog() {
    this.selectedProduct = null;
    this.isShowDialog = false;
  }

  addProduct() {}

  onSearch(event: any) {
    console.log(event.target.value);
    this.keyword = event.target.value;
  }
}
