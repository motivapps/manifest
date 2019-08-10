import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthStack from './MainAuthStackNav';
import AppDrawerNav from './MainAppDrawerNav';
import AuthLoadingScreen from '../screens/AppLoading';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppDrawerNav,
    },
    {
      initialRouteName: 'AuthLoading',
      // backBehavior: 'none',
    }
  )
);
