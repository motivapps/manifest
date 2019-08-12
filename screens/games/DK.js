import React from 'react';
import DonkeyKong from 'react-native-donkey-kong';

class DKScreen extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <DonkeyKong />;
  }
}

export default DKScreen;
