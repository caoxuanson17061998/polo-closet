export interface ILogin {
  username: string;
  password: string;
}

export interface ICreateProduct {
  name: string;
  link_avt: string;
  link_img1: string;
  link_img2: string;
  link_img3: string;
  quantity: number;
  status: string;
  size: string[];
  color: string;
  price: number;
  category: string;
}
