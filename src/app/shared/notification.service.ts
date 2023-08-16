import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertComponent } from './alert/alert.component';

@Injectable()
export class NotificationService {
  public readonly TIME_LIFE = 4000;
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {}

  info(message: string, timeLife?: number) {
    this.show({
      data: {
        message,
        type: 'info',
      },
      duration: timeLife ? timeLife : this.TIME_LIFE,
      panelClass: 'fsel-info-notification-overlay',
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  success(message: string, timeLife?: number) {
    this.show({
      data: {
        message,
        type: 'success',
      },
      duration: timeLife ? timeLife : this.TIME_LIFE,
      panelClass: 'fsel-success-notification-overlay',
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  warn(message: string, timeLife?: number) {
    this.show({
      data: {
        message,
        type: 'warn',
      },
      duration: timeLife ? timeLife : this.TIME_LIFE,
      panelClass: 'fsel-warning-notification-overlay',
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  error(message: string, timeLife?: number) {
    this.show({
      data: {
        message,
        type: 'error',
      },
      duration: timeLife ? timeLife : this.TIME_LIFE,
      panelClass: 'fsel-error-notification-overlay',
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  private show(configuration: MatSnackBarConfig) {
    this.zone.run(() =>
      this.snackBar.openFromComponent(AlertComponent, configuration)
    );
  }
}
