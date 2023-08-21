import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string | null {
    if (!value) {
      return null;
    }
    const numericCharacters = value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số

    const formattedPhoneNumber = numericCharacters.replace(
      /(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3'
    );

    return formattedPhoneNumber;
  }
}
