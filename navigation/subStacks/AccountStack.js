import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import PlaidScreen from '../../screens/PlaidScreen';
import MyAccountScreen from '../../screens/MyAccountScreen';
import AccountAssignScreen from '../../screens/AccountAssignScreen';
import defaultHeader from './DefaultHeader';

const _ = require('lodash');

const PlaidStack = createStackNavigator(
  {
    PlaidScreen: {
      screen: PlaidScreen,
    },
    AccountAssign: {
      screen: AccountAssignScreen,
    },
  },
  {
    initialRouteName: 'PlaidScreen',
    initialRouteParams: {
      auth: false,
    },
    backBehavior: 'initialRoute',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);

const AccountStack = createStackNavigator(
  {
    MyAccount: {
      screen: MyAccountScreen,
    },
    // substack here.
    Plaid: {
      screen: PlaidStack,
    },
  },
  _.merge(
    {
      initialRouteName: 'MyAccount',
      initialRouteParams: {
        auth: false,
      },
      backBehavior: 'initialRoute',
    },
    defaultHeader,
  ),
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

AccountStack.path = 'app/my-account';

export default AccountStack;
