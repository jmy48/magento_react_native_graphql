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
import { Cart, Price, CartItemType } from './Cart';
import { ProductDetailsType } from '../../apollo/queries/getProductDetails';
import { ProductDetailsScreen } from '../../screens';
import { useSelector, useDispatch } from 'react-redux'

interface Result {
  cartCount: string;
  cartData: Cart | undefined;
  cartLoading: boolean;
  cartError: ApolloError | undefined;
  addToCartLoading: boolean;
  isLoggedIn: boolean;
  addProductsToCart(arg0: ProductDetailsType): void;
}

export const useCart = (): Result => {
  // const { data: { isLoggedIn = true } = {} } = useQuery<IsLoggedInDataType>(
  //   IS_LOGGED_IN,
  // );

  const isLoggedIn = true;

  // function addProductsToCart(productDetails: ProductDetailsType)  {
  //   const priceData: Price = productDetails.priceRange.maximumPrice.finalPrice;
  //   // let cartItems: Array<CartItemType> = cart?.items ?? [];
  //   setCart({
  //     items: [...cartData?.items ?? [], {
  //         product: {
  //           sku: productDetails.sku,
  //           name: productDetails.name,
  //           small_image: {
  //             source: productDetails.mediaGallery[0].source
  //           }
  //         },
  //         price: {
  //           currency: priceData.currency,
  //           value: priceData.value
  //         },
  //         quantity: 1
  //       }],
  //     prices: {
  //       grandTotal: { 
  //         value: (cartData?.prices.grandTotal.value ?? 0) + priceData.value,
  //         currency: (cartData?.prices.grandTotal.currency ?? "USD")
  //       }
  //     },
  //     totalQuantity: cartData?.totalQuantity ?? 0 + 1
  //   });
  //   showMessage({
  //     message: translate('common.success'),
  //     description: translate('productDetailsScreen.addToCartSuccessful'),
  //     type: 'success',
  //   });
  //   console.log("addProductsToCart called with productDetails:");
  //   console.log(productDetails);
  // }

  // const [
  //   fetchCart,
  //   { data: cartData, loading: cartLoading, error: cartError},
  // ] = useLazyQuery<GetCartDataType>(GET_CART);

  // const [_addProductsToCart, { loading: addToCartLoading }] = useMutation<
  //   AddProductsToCartDataType,
  //   AddProductsToCartVars
  // >(ADD_PRODUCTS_TO_CART, {
  //   onCompleted() {
  //     showMessage({
  //       message: translate('common.success'),
  //       description: translate('productDetailsScreen.addToCartSuccessful'),
  //       type: 'success',
  //     });
  //   },
  //   onError(_error) {
  //     showMessage({
  //       message: translate('common.error'),
  //       description:
  //         _error.message || translate('productDetailsScreen.addToCartError'),
  //       type: 'danger',
  //     });
  //   },
  // });

  let cartData = useSelector((state: any) => {
    // console.log("useSelector state");
    // console.log(state);
    return state.cartReducer.cart;
  });

  const dispatch = useDispatch();
  function addProductsToCart(productDetails: ProductDetailsType)  {
    dispatch({type: "ADD_PRODUCT_TO_CART", payload: productDetails})
  };

  const cartLoading: boolean = false;
  const cartError = undefined;

  const cartCount: string = getCartCount(cartData?.items?.length);

  // useEffect(() => {
  //   if (true/*isLoggedIn*/) {
  //     fetchCart();
  //   }
  // }, [isLoggedIn]);

  // const addProductsToCart = (productToAdd: CartItemInputType) => {
  //   // if (isLoggedIn && cartData?.customerCart.id) {
  //   _addProductsToCart({
  //     variables: {
  //       cartId: cartData.id,
  //       cartItems: [productToAdd],
  //     },
  //   });
  //   // }
  // };

  const addToCartLoading = false;
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
