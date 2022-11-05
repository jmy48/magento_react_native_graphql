import React from 'react';
import { GenericTemplate } from '../../components';
import { Text, ThemeContext, Button, Badge } from 'react-native-elements';
import { View, FlatList, StyleSheet } from 'react-native';
import { translate } from '../../i18n';
import { Routes } from '../../navigation/routeNames';
import { useNavigation } from '@react-navigation/native';
import { SPACING } from '../../constants';
import { formatPrice } from '../../logic';
import { useCart } from '../../logic/cart/useCart';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import Props from '../../navigation/BottomTabNavigator';

export default function CheckoutScreen(): React.ReactElement {
    let navigation = useNavigation();
    const { cartData, cartLoading, cartError } = useCart();
    console.log("checkout screen render jsx");
    console.log(cartData);
    return (
    <>
    <GenericTemplate
        style={styles.container}
        // footer={
        // <View style={styles.footer}>
        //     <Button
        //     style={styles.button}
        //     title={"Go to profile"}
        //     onPress={() =>
        //         navigation.navigate(Routes.NAVIGATION_TO_PROFILE_SCREEN)
        //     }
        //     />
        //     <Text></Text>
        //     <Button
        //     style={styles.button}
        //     title={"Continue Scanning"}
        //     onPress={() => navigation.navigate(Routes.NAVIGATION_TO_DEEZ_NUTS)}
        //     />
        //     <Text></Text>
        //     <Text></Text>
        //     <Text></Text>
        // </View>
        // }
    >
    <Text style={styles.title}>Order #1945686703</Text>
    <Text>{Date()}</Text>
    {
        cartData!.items.map((item) =>
            <CheckoutListItem
                    item={item}
            />
        )
    }
    {/* <FlatList
        data={cartData?.items ?? []}
        renderItem={({ item }) => (
          <CheckoutListItem
            item={item}
          />
        )}
        // contentContainerStyle={
        //   cartData?.items.length === 0 && styles.fullScreen
        // }
        keyExtractor={item => item.product.sku}
    {/> */}
    </GenericTemplate>
    {/* <BottomTabNavigator() /> */}
    </>
    );
};

import { CartItemType } from '../../logic/cart/Cart';
import { DIMENS } from '../../constants';
import { Image, ListItem } from 'react-native-elements';
type CheckoutListItemProps = {
    item: CartItemType;
    // index: number;
};
  
const CheckoutListItem = ({item}: CheckoutListItemProps): React.ReactElement => {
    console.log("checkoutlistitem", item);
    return (
        <ListItem bottomDivider>
        <Image source={item.product.small_image.source} style={CheckoutListItemStyles.image} />
        <Text>({item.quantity}) {item.product.name}</Text>
        <Text>({item.price.currency}) {item.price.value} </Text>
        {/* <ListItem.Content>
            <ListItem.Title>{item.product.name}</ListItem.Title>
            <ListItem.Subtitle>{`${translate('common.quantity')} : ${
            item.quantity
            }`}</ListItem.Subtitle>
            <ListItem.Subtitle>{`${translate('common.price')} : ${formatPrice(
            item.price,
            )}`}</ListItem.Subtitle>
        </ListItem.Content> */}
        </ListItem>
    );
};

const CheckoutListItemStyles = StyleSheet.create({
image: {
    height: DIMENS.cartScreen.imageSize,
    width: DIMENS.cartScreen.imageSize,
},
});

const styles = StyleSheet.create({
    fullScreen: {flex: 1,},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
  },
  footer: {
    padding: SPACING.small,
  },
  button: {
    marginTop: "1000px",
    padding: SPACING.large,
  },
  title: {
    textAlign: 'center',
    marginTop: SPACING.large,
  },
  message: {
    marginTop: SPACING.tiny,
    textAlign: 'center',
  },
});

// OrderAcknowledgementScreen.propTypes = propTypes;

// OrderAcknowledgementScreen.defaultProps = defaultProps;

// // export default connect(null, {
// //   resetCheckoutState,
// // })(OrderAcknowledgementScreen);