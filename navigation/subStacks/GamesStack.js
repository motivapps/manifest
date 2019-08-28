import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import defaultHeader from './DefaultHeader';
import GamesScreen from '../../screens/GamesScreen';
import DKScreen from '../../screens/games/DK';
import GameTwoScreen from '../../screens/games/GameTwo';
import GameThreeScreen from '../../screens/games/GameThree';
import GameFourScreen from '../../screens/games/GameFour';

const GamesStack = createStackNavigator(
  {
    Goals: {
      screen: GamesScreen,
    },
    DK: {
      screen: DKScreen,
    },
    GameTwo: {
      screen: GameTwoScreen,
    },
    GameThree: {
      screen: GameThreeScreen,
    },
    GameFour: {
      screen: GameFourScreen,
    },
  },
  defaultHeader,
);

GamesStack.navigationOptions = {
  tabBarLabel: 'Games',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

GamesStack.path = 'app/games';

export default GamesStack;
