import React from 'react';
import {
 StyleSheet, Text, TouchableOpacity, View 
} from 'react-native';
import { AppLoading, Constants, ScreenOrientation } from 'expo';

ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

export default class GameTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gamePause: false,
      isLoading: true,
      score: 0,
    };
  }
  render() {
    return (
      <Text>GameTwo</Text>
    );
  }
}
