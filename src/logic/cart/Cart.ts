import { ImageSource } from "react-native-vector-icons/Icon";

export class Cart {
  items: Array<CartItemType> = [];
  prices: {
    grandTotal: Price;  // | undefined;
  } = {grandTotal: {value: 0, currency: "USD"}};
  totalQuantity: number = 0;
}

export class CartItemType {
  product!: {
    sku: string;
    name: string;
    small_image: {
      source: ImageSource;
    };
  };
  price!: Price;
  quantity!: number;
}

export class Price {
  currency = 'USD';
  value = 19.99;
}