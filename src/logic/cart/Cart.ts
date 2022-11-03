export class Cart {
  id!: string;
  items!: Array<CartItemType>;
  prices!: {
    grandTotal: Price | undefined;
  };
  totalQuantity!: number;
}

export class CartItemType {
  id!: number;
  product!: {
    sku: string;
    name: string;
    small_image: {
      url: string;
    };
  };
  price!: Price;
  quantity!: number;
}

export class Price {
  currency = 'USD';
  value = 19.99;
}
