import React from 'react';
import { AppLoading } from 'expo';
// import { SwitchActions } from 'react-navigation';
import { AsyncStorage, View } from 'react-native';

class LogOutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Remove the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    // this screen will be unmounted and thrown away.
    // this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: '' }));
    this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <AppLoading />
      </View>
    );
  }
}

export default LogOutScreen;
