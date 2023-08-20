import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/shared/no-white-space.validator';
import { SharedService } from 'src/app/shared/shared.service';

interface NameImages {
  [key: string]: string;
}
@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
})
export class DialogProductComponent implements OnInit {
  @Input() selectedProduct: any;

  link_avt = '';
  nameImages: NameImages = {
    link_img1: '',
    link_img2: '',
    link_img3: '',
  };

  get nameImagesKey() {
    return Object.keys(this.nameImages);
  }

  get isShowAddImage() {
    return (
      !this.form.value.link_img1 ||
      !this.form.value.link_img2 ||
      !this.form.value.link_img3
    );
  }

  statusOptions = [
    {
      label: 'Còn hàng',
      value: 'in stock',
    },
    {
      label: 'Hết hàng',
      value: 'out of stock',
    },
    {
      label: 'Ngừng bán',
      value: 'out of business',
    },
  ];

  form: FormGroup<any> = this.fb.group({
    name: this.fb.control('', [Validators.required, NoWhitespaceValidator()]),
    quantity: this.fb.control(null, [Validators.required, Validators.min(1)]),
    status: this.fb.control('in stock', Validators.required),
    size: this.fb.control([], Validators.required),
    color: this.fb.control('', [Validators.required, NoWhitespaceValidator()]),
    price: this.fb.control('', [Validators.required, Validators.min(1)]),
    description: this.fb.control('', [
      Validators.required,
      NoWhitespaceValidator(),
    ]),
    link_avt: this.fb.control('', Validators.required),
    link_img1: this.fb.control('', Validators.required),
    link_img2: this.fb.control('', Validators.required),
    link_img3: this.fb.control('', Validators.required),
  });

  sizes = [
    {
      name: 'XS',
      value: 'XS',
    },
    {
      name: 'S',
      value: 'S',
    },
    {
      name: 'M',
      value: 'M',
    },
    {
      name: 'L',
      value: 'L',
    },
    {
      name: 'XL',
      value: 'XL',
    },
    {
      name: '2XL',
      value: '2XL',
    },
    {
      name: '3XL',
      value: '3XL',
    },
  ];
  constructor(private fb: FormBuilder, private shareService: SharedService) {}

  ngOnInit(): void {
    if (this.selectedProduct) {
      this.shareService
        .getDetailProduct(this.selectedProduct._id)
        .subscribe(res => {
          this.form.patchValue(res.product);
        });
    }
  }

  async onChooseFile(event: any, isAvatar: boolean) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      if (isAvatar) {
        this.link_avt = String(inputElement.files[0].name);
        const base64Image = await this.convertToBase64(inputElement.files[0]);
        this.form.patchValue({
          link_avt: base64Image,
        });
      } else {
        const key = Object.keys(this.nameImages).find(key => {
          return this.nameImages[key] === '';
        });
        if (key) {
          this.nameImages[key] = String(inputElement.files[0].name);
          const base64Image = await this.convertToBase64(inputElement.files[0]);
          this.form.patchValue({
            [key]: base64Image,
          });
        }
      }
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onRemoveFile(type: string) {
    if (type === 'link_avt') {
      this.link_avt = '';
    } else {
      this.nameImages[type] = '';
    }
    this.form.patchValue({ [type]: '' });
  }
}
