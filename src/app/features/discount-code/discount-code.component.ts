import { NotificationService } from './../../shared/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss'],
})
export class DiscountCodeComponent implements OnInit {
  form = this.fb.group({
    title: this.fb.control(null, Validators.required),
    content: this.fb.control(null, Validators.required),
    startDate: this.fb.control(null, Validators.required),
    endDate: this.fb.control(null, Validators.required),
    discountType: this.fb.control('percent', Validators.required),
    discountValue: this.fb.control(null, Validators.required),
    orderValueCondition: this.fb.control(null, Validators.required),
  });

  typeOptions = [{ label: 'Percent', value: 'percent' }];

  constructor(
    private fb: FormBuilder,
    private shardService: SharedService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

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
        this.notificationService.success('Tạo mã giảm giá thất bại');
        this.onCancel();
      },
    });
  }

  onlyNumberKey(evt: any) {
    // Only ASCII character in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
  }
}
