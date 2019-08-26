import { createStackNavigator } from 'react-native';
import TabBarIcon from '../../components/TabBarIcon';
import PlaidScreen from '../../screens/PlaidScreen';
import MyAccountScreen from '../../screens/MyAccountScreen';
import AccountAssignScreen from '../../screens/AccountAssignScreen';
import defaultHeader from './DefaultHeader';

const _ = require('lodash');

const AccountStack = createStackNavigator(
  {
    MyAccount: {
      screen: MyAccountScreen,
    },
    Plaid: {
      screen: PlaidScreen,
    },
    AccountAssign: {
      screen: AccountAssignScreen,
    },
  },
  _.merge({
    initialRouteName: 'MyAccount',
    initialRouteParams: {
      auth: false,
    },
  }, defaultHeader),
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

AccountStack.path = 'app/my-account';

export default AccountStack;
