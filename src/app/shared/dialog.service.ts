import { Injectable, NgZone } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
// import { DialogType } from 'src/app/types';

export enum DialogType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private zone: NgZone) {}

  delete(message: string) {
    return this.dialog.open(ConfirmDeleteComponent, {
      data: { message },
      width: '386px',
    });
  }

  confirm(message: string, type: DialogType) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        message,
        type,
      },
      width: '386px',
    });
  }

  openDialog(
    config: any,
    inputData: any,
    callback?: (data: any) => void
  ): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '28vw';
    dialogConfig.height = 'calc(100% - 60px)';

    dialogConfig.position = {
      right: '0',
    };

    dialogConfig.data = {
      detailData: inputData.detailData,
      customData: inputData.customData,
    };

    config.dialogRef = this.dialog.open(config.formDetail, dialogConfig);

    setTimeout(() => {
      const dialogContainer = document.querySelector(
        '.mat-dialog-container'
      ) as HTMLElement;
      if (dialogContainer) {
        dialogContainer.style.marginTop = '30px';
      }
    });

    config.dialogRef.afterClosed().subscribe((updatedFromDetail: any) => {
      if (updatedFromDetail && inputData.data) {
        inputData.data = updatedFromDetail;
      } //Để tránh ảnh hưởng đến logic code cũ, Sau sẽ dùng callback để xử lý sau khi đóng dialog

      if (callback) {
        callback(updatedFromDetail);
      }
    });
  }
}
