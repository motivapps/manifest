import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import TransactionsScreen from '../../screens/TransactionsScreen';
import defaultHeader from './DefaultHeader';

const TransactionsStack = createStackNavigator(
  {
    Transactions: {
      screen: TransactionsScreen,
    },
  },
  defaultHeader,
);

TransactionsStack.navigationOptions = {
  tabBarLabel: 'Transactions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused} 
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

TransactionsStack.path = 'app/transactions';

export default TransactionsStack;
