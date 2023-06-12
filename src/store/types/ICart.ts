export interface ICartItem {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
  price: number;
  numberInStock: number;
  createdAt: string;
  quantity: number;
  updatedAt: string;
}

export interface ICartResponse {
  _id: string;
  user: string;
  items: ICartItem[];
  __v: number;
}
