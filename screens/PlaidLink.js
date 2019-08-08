import React from 'react';
import { Text, View, Image } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { NGROK } from '../app.config.json'
// import { Button } from 'react-native-elements';
// import { styles, colorTheme } from '../../common/styles';

// import { sendToken } from '../../store/token';

class Link extends React.Component {
  static navigationOptions = {
    title: 'Manifest',
    headerStyle: { fontWeight: 'bold' },
    headerTitleStyle: { color: 'green' },
  };

  state = {
    data: {},
    status: '',
  };

  onMessage = data => {
    console.log(data);
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase(),
    });
  };

  renderLogin() {
    return (
      <View>
        <Text>This is where the Plaid Authenticator is...</Text>
        <PlaidAuthenticator
          onMessage={this.onMessage}
          publicKey="a35fead643ab95153802609fa5c0a2"
          env="sandbox"
          product="auth,transactions"
          clientName="Mani"
          webhook={`${NGROK}/transaction_hook`}
        />
      </View>
    );
  }

  //
  // };

  renderDetails() {
    // this.props.sendToken(this.state.data.metadata.public_token);
    // send public_token to server:
    fetch(`${NGROK}/get_access_token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_token: this.state.data.metadata.public_token,
      }),
    });
    return (
      <View>
        <Text>NEXT STEP</Text>
        <View>
          <View style={{ padding: 10 }}>
            <Button raised textStyle={{ textAlign: 'center' }} title={`Set Up Your Budget`} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    switch (this.state.status) {
      case 'CONNECTED':
        return this.renderDetails();
      default:
        return this.renderLogin();
    }
  }

  // const mapDispatch = dispatch => {
  //   return {
  //     // rename to same thing - shorthand
  //     sendToken: token => dispatch(sendToken(token))
  //   };
  // };

  // export default connect(
  //   null,
  //   mapDispatch
  // )(Link);
}
export default Link;
