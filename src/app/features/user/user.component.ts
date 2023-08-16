import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { SharedService } from 'src/app/shared/shared.service';

export enum Status {
  Pending = 'pending',
  Active = 'active',
  Limited = 'limited',
  Locked = 'locked',
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: any[] = [];

  Status = Status;

  keyword = null;

  selectedUser = null;

  get totalUsers() {
    if (this.keyword) {
      return this.users.filter(user =>
        user.fullname.includes(String(this.keyword))
      ).length;
    }
    return this.users.length;
  }

  get usersByCondition() {
    if (Array.isArray(this.users) && this.users.length) {
      let users = this.users;
      if (this.keyword) {
        this.currentPage = 1;
        users = this.users.filter(user =>
          user.fullname
            .toLowerCase()
            .includes(String(this.keyword).toLowerCase())
        );
      }
      return users.slice(
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
    return Math.ceil(this.totalUsers / this.rowsPerPage);
  }

  rowsPerPage = 5;
  currentPage = 1;

  // selectedUser = null;

  constructor(
    private shardService: SharedService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.shardService
      .getUsers()
      .pipe(take(1))
      .subscribe(res => {
        this.users = res.users;
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
      if (this.currentPage === Math.ceil(this.totalUsers / this.rowsPerPage)) {
        return;
      }
      this.currentPage++;
    }
  }

  onChangeStatus(user: any) {
    // this.selectedUser = user;
    // this.dialogService.confirm(`Bạn có muốn thay đổi trạng của của ${user.username}`)
    let payload;
    if ([Status.Active, Status.Limited].includes(user.status)) {
      payload = { status: Status.Locked };
    } else {
      payload = { status: Status.Active };
    }
    this.spinner.show();
    this.shardService.updateStatusUser(user.username, payload).subscribe({
      next: res => {
        this.notificationService.success(res.message);
        this.ngOnInit();
      },
      error: () => {
        this.notificationService.error('Thay đổi trạng thái user thấy bại');
      },
    });
  }

  onSearch(event: any) {
    this.keyword = event.target.value;
  }
}
