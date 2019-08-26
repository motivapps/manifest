import { createDrawerNavigator } from 'react-navigation';
import LogOutScreen from '../screens/LogOutScreen';
import HomeStack from './subStacks/HomeStack';
import StatsStack from './subStacks/StatsStack';
import GoalsStack from './subStacks/GoalStack';
import GamesStack from './subStacks/GamesStack';
import AccountStack from './subStacks/AccountStack';
import TransactionsStack from './subStacks/TransactionStack';

const drawerNavigator = createDrawerNavigator(
  {
    HomeStack,
    StatsStack,
    GoalsStack,
    GamesStack,
    TransactionsStack,
    AccountStack,
    LogOut: {
      screen: LogOutScreen,
    },
  },
  {
    initialRouteName: 'HomeStack',
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#49d5b6',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#49d5b6',
    },
    backBehavior: 'initialRoute',
  },
);

drawerNavigator.path = 'app/';

export default drawerNavigator;
