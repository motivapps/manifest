import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../../components/TabBarIcon';
import defaultHeader from './DefaultHeader';
import GoalsScreen from '../../screens/GoalsScreen';
import GoalsSummaryScreen from '../../screens/GoalsSummaryScreen';

const _ = require('lodash');

const GoalsStack = createStackNavigator(
  {
    Goals: {
      screen: GoalsScreen,
    },
    GoalSummary: {
      screen: GoalsSummaryScreen,
    },
  },
  _.merge({
    initialRouteName: 'Goals',
    initialRouteParams: {
      auth: false,
    },
  }, defaultHeader),
);

GoalsStack.navigationOptions = {
  tabBarLabel: 'Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

GoalsStack.path = 'app/goals';


export default GoalsStack;
