import React from 'react';
import { Text } from 'react-native';

export default class ManifestTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25 }} onPress={() => {
        return console.log('Would be nice if this went back to home screen');
      }}>Manifest</Text>
    )
  }
}