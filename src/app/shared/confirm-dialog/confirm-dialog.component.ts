import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogType } from '../dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  DialogType = DialogType;
  @ViewChild('dialogIcon', { static: true })
  dialogIconRef!: ElementRef<HTMLImageElement>;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; type: DialogType }
  ) {}

  ngOnInit(): void {
    const { type } = this.data;
    let srcImg = '';
    if (type === DialogType.SUCCESS) {
      srcImg = '../../../../assets/icons/dialogs/success-circle.svg';
    } else if (type === DialogType.INFO) {
      srcImg = '../../../../assets/icons/dialogs/blue-info-circle.svg';
    } else if (type === DialogType.ERROR) {
      srcImg = '../../../../assets/icons/dialogs/error-circle.svg';
    } else {
      srcImg = '../../../../assets/icons/dialogs/yellow-info-circle.svg';
    }

    this.dialogIconRef.nativeElement.src = srcImg;
  }

  close() {
    this.dialogRef.close();
  }
}
