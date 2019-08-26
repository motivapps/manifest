import React from 'react';
import { Platform } from 'react-native';
import ManifestTitle from '../../screens/Header';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const defaultHeader = {
  defaultNavigationOptions: {
    headerTitle: <ManifestTitle />,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#4c4c4c',
    },
  },
  headerLayoutPreset: 'center',
  config,
};


export default defaultHeader;
