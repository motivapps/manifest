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
    Home: HomeStack,
    Stats: StatsStack,
    Goals: GoalsStack,
    Games: GamesStack,
    Transactions: TransactionsStack,
    Account: AccountStack,
    LogOut: {
      screen: LogOutScreen,
    },
  },
  {
    initialRouteName: 'Home',
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
