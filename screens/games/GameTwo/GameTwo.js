import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { AppLoading, Constants, ScreenOrientation } from 'expo';
import Controls from './Controls';

ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);

export default class GameTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pause: false,
      isLoading: true,
      score: 0,
      lives: 3,
    };
    this.onPauseGame = this.onPauseGame.bind(this);
  }

  onPauseGame() {
    this.setState(prevState => ({
      pause: !prevState.pause,
    }));
  }

  render() {
    const { pause, isLoading, score, lives } = this.state;

    // if (isLoading) {
    //   return (
    //     <AppLoading
    //       onFinish={() => this.setState({ isLoading: false })}
    //       // startAsync={this.preloadAssetsAsync}
    //     />
    //   );
    // }

    return (
      <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.text}>{`Score: ${score}`}</Text>
          <Text style={styles.text}>{`Lives Remaining: ${lives}`}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.onPauseGame}
          style={styles.footerButton}
        >
          <Text style={styles.footerText}>
            {pause ? 'Play' : 'Pause'}
          </Text>
        </TouchableOpacity>
      </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    left: 16,
    position: 'absolute',
    marginTop: 50,
    width: '100%',
  },
  text: {
    color: '#000',
  },
  footer: {
    alignItems: 'center',
    bottom: 32,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
  footerButton: {
    backgroundColor: '#4c4c4c',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    width: 76,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
  },
});
