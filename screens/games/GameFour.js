import React from 'react';
import { WebView } from 'react-native';

class GameFour extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://cdn.htmlgames.com/FrozenBubble/' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default GameFour;