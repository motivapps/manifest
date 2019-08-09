import { createStackNavigator } from 'react-navigation';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: SignupScreen,
      path: 'auth/signup',
    },
    Login: {
      screen: LoginScreen,
      path: 'auth/login',
    },
  },
  {
    initialRouteName: 'Signup',
  }
);

export default AuthStack;
