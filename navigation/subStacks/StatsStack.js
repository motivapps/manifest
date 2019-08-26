import { createStackNavigator } from 'react-native';
import TabBarIcon from '../../components/TabBarIcon';
import defaultHeader from './DefaultHeader';
import StatsScreen from '../../screens/StatsScreen';

const StatsStack = createStackNavigator(
  {
    Stats: {
      screen: StatsScreen,
    },
  },
  defaultHeader,
);

StatsStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

StatsStack.path = 'app/stats';

export default StatsStack;
