import React from 'react';
import { Text } from 'react-native';

export default ManifestTitle = () => (
  <Text
    style={{ color: '#fff', fontWeight: 'bold', fontSize: 25 }}
    onPress={() => console.log('Would be nice if this went back to home screen')}
  > Manifest
  </Text>
);
