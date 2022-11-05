import { createStore, combineReducers} from 'redux';
import { showMessage } from 'react-native-flash-message';
import { translate } from '../i18n';

// const rootReducer = combineReducers({
//     cart: CountReducer,
// });

let initialState = {cart: {
    items: [],
    prices: {
        grandTotal: {value: 0, currency: "USD"}
    }
}}

// const action = {
//     // type: 'ADD_PRODUCT_TO_CART',
//     // payload: {
//     //   lastname: 'Wieruch',
//     // },
// };

function cartReducer(state=initialState, action) {
    // console.log("cartReducer please fucking work");
    // console.log(state);
    // console.log(action.payload);
    cartData = state.cart;
    switch (action.type) {
        case 'ADD_PRODUCT_TO_CART': {
            let productDetails = action.payload;
            let priceData = productDetails.priceRange.maximumPrice.finalPrice;
            let newCart = {
                items: [...cartData?.items ?? [], {
                    product: {
                      sku: productDetails.sku,
                      name: productDetails.name,
                      small_image: {
                        source: productDetails.mediaGallery[0].source
                      }
                    },
                    price: {
                      currency: priceData.currency,
                      value: priceData.value
                    },
                    quantity: 1
                  }],
                prices: {
                  grandTotal: { 
                    value: (cartData?.prices.grandTotal.value ?? 0) + priceData.value,
                    currency: (cartData?.prices.grandTotal.currency ?? "USD")
                  }
                },
                totalQuantity: cartData?.totalQuantity ?? 0 + 1
            }
              
            showMessage({
                message: translate('common.success'),
                description: translate('productDetailsScreen.addToCartSuccessful'),
                type: 'success',
            });
            return {cart: newCart};

        }
        case 'DELETE_PRODUCT_FROM_CART' : {
          return state
        }

        default: {
          return state
        }
    }
}

const rootReducer = combineReducers({
  cartReducer,
});
export const store = createStore(rootReducer);