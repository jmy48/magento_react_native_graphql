import { CategoryProductsDataType } from '../../apollo/queries/getCategoryProducts';
import {
  GET_PRODUCT_DETAILS,
  GetProductDetailsVars,
  ProductDetailsDataType,
  ProductDetailsType,
  ProductTypeEnum,
} from '../../apollo/queries/getProductDetails';

import { SimpleProductDetailsType } from '../../apollo/queries/getProductDetails';

export const getHardedCategoryProductsData = (
  category: number,
): CategoryProductsDataType => {
  switch (category) {
    case 1: {
      return {
        products: {
          totalCount: 1,
          items: [
            {
              id: 0,
              sku: '0',
              name: 'product_name',
              smallImage: {
                source: require('./assets/gucci_bag_0.png'),
              },
              priceRange: {
                maximumPrice: {
                  finalPrice: {
                    currency: 'USD',
                    value: 19.99,
                  },
                },
              },
            },
          ],
        },
      };
    }
    default: {
      return {
        products: {
          totalCount: 0,
          items: [],
        },
      };
    }
  }
};

// export interface ProductInterfaceDetailsType {
//     id: number;
//     sku: string;
//     name: string;
//     description: {
//       html: string;
//     };
//     priceRange: PriceRangeType;
//     mediaGallery: Array<MediaGalleryItemType>;
//   }

// export interface MediaGalleryItemType {
//     disabled: boolean;
//     label: string;
//     position: number;
//     // url: string;
//     source: ImageSource;
//   }

export const getProductDetailsData = (sku: string): ProductDetailsDataType => {
  switch (sku) {
    case 'this_is_the_sku_im_gonna_blow_your_mom': {
      return {
        products: {
          items: [
            {
              id: 0,
              sku: 'this_is_the_sku_im_gonna_blow_your_mom',
              name: 'product_name',
              type: ProductTypeEnum.SIMPLE,
              description: {
                html: 'test description string',
              },
              priceRange: {
                maximumPrice: {
                  finalPrice: {
                    currency: 'USD',
                    value: 19.99,
                  },
                },
              },
              mediaGallery: [
                {
                  disabled: false,
                  label: 'label test string',
                  position: 0,
                  source: require('./assets/gucci_bag_0.png'),
                },
                {
                  disabled: false,
                  label: 'label test string 2',
                  position: 1,
                  source: require('./assets/gucci_bag_0.png'),
                },
              ],
            },
          ],
        },
      };
    }
    default: {
      return {
        products: {
          items: [],
        },
      };
    }
  }
};
