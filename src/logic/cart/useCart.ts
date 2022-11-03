import { useEffect, useState } from 'react';
import {
  ApolloError,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { showMessage } from 'react-native-flash-message';
import {
  IsLoggedInDataType,
  IS_LOGGED_IN,
} from '../../apollo/queries/isLoggedIn';
import { GetCartDataType, GET_CART } from '../../apollo/queries/getCart';
import {
  AddProductsToCartDataType,
  AddProductsToCartVars,
  ADD_PRODUCTS_TO_CART,
  CartItemInputType,
} from '../../apollo/mutations/addProductsToCart';
import { translate } from '../../i18n';
import { getCartCount } from '../utils/cartHelpers';
import { Cart } from './Cart';

interface Result {
  cartCount: string;
  cartData: Cart;
  cartLoading: boolean;
  cartError: ApolloError | undefined;
  addToCartLoading: boolean;
  isLoggedIn: boolean;
  addProductsToCart(arg0: CartItemInputType): void;
}

export const useCart = (): Result => {
  const { data: { isLoggedIn = true } = {} } = useQuery<IsLoggedInDataType>(
    IS_LOGGED_IN,
  );

  const [cart, setCart] = useState<Cart>({
    id: 'cart0',
    items: [],
    prices: { grandTotal: undefined },
    totalQuantity: 0,
  });

  // const [
  //   fetchCart,
  //   { data: cartData, loading: cartLoading, error: cartError},
  // ] = useLazyQuery<GetCartDataType>(GET_CART);

  const [_addProductsToCart, { loading: addToCartLoading }] = useMutation<
    AddProductsToCartDataType,
    AddProductsToCartVars
  >(ADD_PRODUCTS_TO_CART, {
    onCompleted() {
      showMessage({
        message: translate('common.success'),
        description: translate('productDetailsScreen.addToCartSuccessful'),
        type: 'success',
      });
    },
    onError(_error) {
      showMessage({
        message: translate('common.error'),
        description:
          _error.message || translate('productDetailsScreen.addToCartError'),
        type: 'danger',
      });
    },
  });

  const cartData: Cart = cart;
  const cartLoading: boolean = false;
  const cartError = undefined;

  const cartCount: string = getCartCount(cartData.items?.length);

  // useEffect(() => {
  //   if (true/*isLoggedIn*/) {
  //     fetchCart();
  //   }
  // }, [isLoggedIn]);

  const addProductsToCart = (productToAdd: CartItemInputType) => {
    // if (isLoggedIn && cartData?.customerCart.id) {
    _addProductsToCart({
      variables: {
        cartId: cartData.id,
        cartItems: [productToAdd],
      },
    });
    // }
  };

  return {
    addProductsToCart,
    isLoggedIn,
    cartCount,
    cartData,
    cartLoading,
    cartError,
    addToCartLoading,
  };
};
