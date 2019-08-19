import React from 'react';
import { WebView } from 'react-native';

class GameThree extends React.Component {
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