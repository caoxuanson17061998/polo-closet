import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
})
export class DialogProductComponent implements OnInit {
  @Input() selectedProduct: any;

  // form = {
  //   name: null,
  //   description: null,
  //   color: null,
  //   quantity: null,
  //   price: null,
  //   size: null,
  //   banner: null,
  //   pictures: null,
  // };

  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    quantity: this.fb.control(null, Validators.required),
    status: this.fb.control('', Validators.required),
    size: this.fb.control([], Validators.required),
    color: this.fb.control('', Validators.required),
    price: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    soldCount: this.fb.control(null, Validators.required),
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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onChooseFile(event: any) {}
}
