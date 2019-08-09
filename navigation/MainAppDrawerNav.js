import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaidScreen from '../screens/PlaidScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = 'app/home/';

const PlaidStack = createStackNavigator(
  {
    Plaid: PlaidScreen,
  },
  config
);

PlaidStack.navigationOptions = {
  tabBarLabel: 'Plaid',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

PlaidStack.path = 'app.Plaid';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = 'app/settings';

const drawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Plaid: {
      screen: PlaidScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#49d5b6',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#49d5b6',
    },
  }
);

drawerNavigator.path = 'app/';

export default drawerNavigator;
