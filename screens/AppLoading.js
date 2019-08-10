import React from 'react';
import { AppLoading } from 'expo';

import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Text} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('userToken', userToken)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text> TEST </Text>
        <AppLoading />
      </View>
    );
  }
}

export default AuthLoadingScreen;
