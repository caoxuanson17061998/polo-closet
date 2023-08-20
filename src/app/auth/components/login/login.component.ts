import { NotificationService } from './../../../shared/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/shared/no-white-space.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  form: FormGroup<any> = this.fb.group({
    username: this.fb.control('admin', [
      Validators.required,
      NoWhitespaceValidator(),
    ]),
    password: this.fb.control('admin', [
      Validators.required,
      NoWhitespaceValidator(),
    ]),
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    const { value, invalid } = this.form;
    if (invalid) {
      this.notificationService.error('Đăng nhập thất bại');
      return;
    }

    this.spinner.show();
    this.authService.login(value).subscribe({
      next: res => {
        this.notificationService.success(res.message);
      },
      error: () => {
        this.notificationService.error('Đăng nhập thất bại');
      },
    });
  }
}
