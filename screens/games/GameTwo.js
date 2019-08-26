import React from 'react';
import { WebView } from 'react-native';
import { ScreenOrientation } from 'expo';

class GameTwo extends React.Component {
  async componentWillMount() {
    await ScreenOrientation.unlockAsync();
  }


  render() {
    return (
      <WebView
        source={{ uri: 'https://cdn.htmlgames.com/CrystalHexajong/' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default GameTwo;
