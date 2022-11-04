import React, { useEffect } from 'react';
import { View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button, Text } from 'react-native-elements';
import { GenericTemplate } from '../../components';
import { translate } from '../../i18n';
import { useCustomer, useLogout } from '../../logic';
import { BottomTabNavigatorParamList, Routes } from '../../navigation';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';

type Props = {
  navigation: BottomTabNavigationProp<
    BottomTabNavigatorParamList,
    Routes.NAVIGATION_TO_DEEZ_NUTS
  >;
};

const DeezNutsScreen = ({ navigation }: Props): React.ReactElement => {
  const navigation_shit = useNavigation();
  function onSuccess(e: BarCodeReadEvent) {
    console.log(e);
    console.log(e.data);
    navigation_shit.navigate(Routes.NAVIGATION_TO_PRODUCT_DETAILS_SCREEN, {
      name: 'Scanned Product',
      sku: e.data,
    });
  }
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
          on your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default DeezNutsScreen;
