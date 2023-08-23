import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsSeparator',
})
export class ThousandsSeparatorPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    }

    // Chuyển đổi số thành chuỗi và thêm dấu phân cách hàng nghìn
    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${formattedValue} VNĐ`;
  }
}
