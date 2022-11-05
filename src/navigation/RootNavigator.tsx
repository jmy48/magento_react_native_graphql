import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import { DrawerScreen } from '../screens';
import { navigationLightTheme, navigationDarkTheme } from '../theme';
import { Provider } from 'react-redux';
import { store } from '../logic/store';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
    <NavigationContainer
      theme={scheme === 'dark' ? navigationDarkTheme : navigationLightTheme}
    >
      <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
        <Drawer.Screen
          name="drawer"
          component={StackNavigator}
          options={{
            swipeEnabled: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default RootNavigator;
