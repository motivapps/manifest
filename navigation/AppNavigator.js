import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthStack from './MainAuthStackNav';
import AppDrawerNav from './MainAppDrawerNav';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
export default createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppDrawerNav,
    },
    {
      initialRouteName: 'Auth',
      backBehavior: 'none',
    }
  )
);
