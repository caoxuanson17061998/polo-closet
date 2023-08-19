import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogProductComponent } from './dialog-product/dialog-product.component';

export interface Product {
  _id: string;
  name: string;
  link_avt: string;
  link_img1: string;
  link_img2: string;
  link_img3: string;
  quantity: number;
  size: string[];
  color: string;
  price: number;
  description: string;
  soldCount: number;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  @ViewChild(DialogProductComponent)
  dialogProductComponent: DialogProductComponent | undefined;
  products: Product[] = [];

  keyword: string | null = null;

  selectedProduct: Product | null = null;

  get totalProducts(): number {
    if (this.keyword) {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(String(this.keyword).toLowerCase())
      ).length;
    }
    return this.products.length;
  }

  get productsByCondition(): Product[] {
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

  get startOrder(): number {
    return (this.currentPage - 1) * this.rowsPerPage + 1;
  }

  get lastPage(): number {
    return Math.ceil(this.totalProducts / this.rowsPerPage);
  }

  rowsPerPage = 5;
  currentPage = 1;

  isShowDialog: boolean = false;
  isShowDeleteDialog: boolean = false;

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

  onEditProduct(product: Product) {
    this.selectedProduct = product;
    this.isShowDialog = true;
  }

  onDeleteProduct() {
    if (this.selectedProduct) {
      this.spinner.show();
      this.sharedService.deleteProduct(this.selectedProduct._id).subscribe({
        next: res => {
          this.notificationService.success(res.message);
          this.ngOnInit();
        },
        error: () => {
          this.notificationService.error('Xóa sản phẩm không thành công');
        },
      });
      this.onCloseDialog();
    }
  }

  onShowDeleteDialog(product: Product) {
    this.selectedProduct = product;
    this.isShowDeleteDialog = true;
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

  onCloseDialog() {
    this.selectedProduct = null;
    this.isShowDialog = false;
    this.isShowDeleteDialog = false;
  }

  addProduct() {}

  onSearch(event: any) {
    this.keyword = event.target.value;
  }

  onSaveProduct() {
    if (this.dialogProductComponent && this.selectedProduct) {
      const { invalid, value } = this.dialogProductComponent.form;

      // if (invalid) {
      //   this.onCloseDialog();
      //   return;
      // }

      if (value) {
        this.spinner.show();
        this.sharedService
          .updateProduct(this.selectedProduct._id, value)
          .subscribe({
            next: res => {
              this.notificationService.success(res.message);
              this.onCloseDialog();
              this.ngOnInit();
            },
            error: () => {
              this.notificationService.success(
                'Cập nhật sản phẩm không thành công'
              );
            },
          });
      }
    }
  }

  onAddProduct() {
    if (this.dialogProductComponent) {
      const { invalid, value } = this.dialogProductComponent.form;
      // if (invalid) {
      //   this.onCloseDialog();
      //   return;
      // }

      if (value) {
        this.spinner.show();
        this.sharedService.createProduct(value).subscribe({
          next: res => {
            this.notificationService.success(res.message);
            this.onCloseDialog();
            this.ngOnInit();
          },
          error: () => {
            this.notificationService.success('Tạo sản phẩm không thành công');
          },
        });
      }
    }
  }
}
