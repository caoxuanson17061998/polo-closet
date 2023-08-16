import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    PasswordModule,
    InputTextModule,
    SidebarModule,
    MenuModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    MatSnackBarModule,
  ],
  exports: [
    // CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    PasswordModule,
    InputTextModule,
    SidebarModule,
    MenuModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
