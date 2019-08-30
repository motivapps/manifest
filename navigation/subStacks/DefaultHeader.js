import React from 'react';
import { Platform } from 'react-native';
import ManifestTitle from '../../screens/Header';

const _ = require('lodash');

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const defaultHeader = {
  defaultNavigationOptions: _.merge(
    {
      headerTitle: <ManifestTitle />,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#4c4c4c',
      },
    },
    config,
    ),
    headerLayoutPreset: 'center',
  };


export default defaultHeader;
