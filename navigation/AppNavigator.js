import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoading from '../screens/AppLoading';
import AuthStack from './MainAuthStackNav';
import AppDrawerNav from './MainAppDrawerNav';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: AuthLoading,
      },
      Auth: AuthStack,
      App: AppDrawerNav,
    },
    {
      initialRouteName: 'AuthLoading',
      backBehavior: 'none',
    }
  )
);
