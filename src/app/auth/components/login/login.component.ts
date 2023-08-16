import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  form: FormGroup<any> = this.fb.group({
    username: this.fb.control('admin', [Validators.required]),
    password: this.fb.control('admin', [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    const { value, invalid } = this.form;
    if (invalid) {
      return;
    }

    this.spinner.show();
    this.authService
      .login(value)
      .subscribe({ next: res => {}, error: () => {} });
  }
}
