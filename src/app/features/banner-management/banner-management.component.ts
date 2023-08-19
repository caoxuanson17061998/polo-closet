import { NotificationService } from './../../shared/notification.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.scss'],
})
export class BannerManagementComponent implements OnInit {
  banner = {
    link1: '',
    link2: '',
    link3: '',
    link4: '',
  };

  constructor(
    private shareService: SharedService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.shareService
      .getBanners()
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.banner = res.banner;
        },
      });
  }

  async onChangeImage(event: any, link: 'link1' | 'link2' | 'link3' | 'link4') {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedImage = inputElement.files[0];
      this.banner[link] = await this.convertToBase64(selectedImage);
    }
  }

  onSave() {
    this.spinner.show();
    const payload = {
      link1: this.banner.link1,
      link2: this.banner.link2,
      link3: this.banner.link3,
      link4: this.banner.link4,
    };
    this.shareService
      .updateBanner(payload)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.notificationService.success('Cập nhật banner thành công');
          this.ngOnInit();
        },
        error: () => {
          this.notificationService.error('Cập nhật banner không thành công');
        },
      });
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
