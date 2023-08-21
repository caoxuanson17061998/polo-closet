import { NotificationService } from './../../shared/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { NoWhitespaceValidator } from 'src/app/shared/no-white-space.validator';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss'],
})
export class DiscountCodeComponent implements OnInit {
  currentDate = new Date();
  form = this.fb.group({
    title: this.fb.control(null, [
      Validators.required,
      NoWhitespaceValidator(),
    ]),
    content: this.fb.control(null, [
      Validators.required,
      NoWhitespaceValidator(),
    ]),
    startDate: this.fb.control(null, Validators.required),
    endDate: this.fb.control(null, Validators.required),
    discountType: this.fb.control('percent', Validators.required),
    discountValue: this.fb.control(null, Validators.required),
    orderValueCondition: this.fb.control(null, Validators.required),
  });

  typeOptions = [{ label: 'Phần trăm', value: 'percent' }];

  currentPromotion: any;

  constructor(
    private fb: FormBuilder,
    private shardService: SharedService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date().getTime();
    this.shardService
      .getPromotions()
      .pipe(take(1))
      .subscribe(res => {
        // debugger;
        this.currentPromotion = res.promotions.find((promotion: any) => {
          const startDate = promotion.startDate
            ? new Date(promotion.startDate).getTime()
            : null;
          const endDate = promotion.endDate
            ? new Date(promotion.endDate).getTime()
            : null;

          if (startDate && endDate) {
            console.log({ startDate, currentDate, endDate });
            return startDate < currentDate && endDate > currentDate;
          }

          return null;
        });

        if (this.currentPromotion) {
          this.currentPromotion.startDate = new Date(
            this.currentPromotion.startDate
          );
          this.currentPromotion.endDate = new Date(
            this.currentPromotion.endDate
          );
          this.form.patchValue(this.currentPromotion);
        }
      });
  }

  onCancel() {
    this.form.patchValue({
      title: null,
      content: null,
      startDate: null,
      endDate: null,
      discountType: null,
      discountValue: null,
      orderValueCondition: null,
    });
  }

  onAdd() {
    const { invalid, value } = this.form;

    if (invalid) {
      this.notificationService.error('Form tạo không hợp lệ');
      return;
    }

    if (Number(value.discountValue) === 0) {
      this.notificationService.error('Giá trị khuyến mại phải lớn hơn 0');
      return;
    }

    if (value.startDate && value.endDate) {
      const startDate = new Date(value.startDate).getTime();
      const endDate = new Date(value.endDate).getTime();
      if (startDate > endDate) {
        this.notificationService.error(
          'Thời gian bắt đầu phải bé hơn thời kết thúc'
        );
        return;
      }
    }

    this.spinner.show();
    this.shardService.createPromotion(value).subscribe({
      next: res => {
        this.notificationService.success(res.message);
        this.onCancel();
      },
      error: () => {
        this.notificationService.error('Tạo mã giảm giá thất bại');
        this.onCancel();
      },
    });
  }
}
