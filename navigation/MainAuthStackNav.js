import { createStackNavigator } from 'react-navigation';
import SignupScreen from '../screens/SignupScreen';
import PlaidScreen from '../screens/PlaidScreen';
import GoalsScreen from '../screens/GoalsScreen';
// import GoalsSummaryScreen from '../screens/GoalsSummaryScreen';
import AccountAssignScreen from '../screens/AccountAssignScreen';

const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: SignupScreen,
      path: 'auth/signup',
    },
    GoalAuth: {
      screen: GoalsScreen,
    },
    PlaidAuth: {
      screen: PlaidScreen,
    },
    AccountAuth: {
      screen: AccountAssignScreen,
    },
  },
  {
    initialRouteName: 'Signup',
  },
);

export default AuthStack;
