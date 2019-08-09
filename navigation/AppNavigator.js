import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaidScreen from '../screens/PlaidScreen';
import HomeScreen from '../screens/HomeScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
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

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: 'app/home/',
    },
    Plaid: {
      screen: PlaidScreen,
      path: 'app/home/',
    },
    Settings: {
      screen: SettingsScreen,
      path: 'app/settings/',
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

export default AppNavContainer = createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);
