import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() deleteConfirmed = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: { message: string }
  ) {}

  ngOnInit(): void {}

  handleKeep() {
    this.dialogRef.close();
  }

  handleDelete() {
    this.dialogRef.close();
    this.deleteConfirmed.emit();
  }
}
