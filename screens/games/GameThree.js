import React from 'react';
import { WebView } from 'react-native';
import { ScreenOrientation } from 'expo';

class GameThree extends React.Component {
  async componentWillMount() {
    await ScreenOrientation.unlockAsync();
  }
   
  render() {
    return (
      <WebView
        source={{ uri: 'https://cdn.htmlgames.com/FeedTheAnimals/' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default GameThree;