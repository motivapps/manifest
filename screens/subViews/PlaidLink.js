import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { NGROK } from '../../app.config.json';
// import { Button } from 'react-native-elements';
// import { styles, colorTheme } from '../../common/styles';

// import { sendToken } from '../../store/token';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      status: '',
      userToken: null,
    };
  }

  async componentWillMount() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        console.log(userToken);
        this.setState({ userToken });
      }
    } catch (error) {
      console.error(error);
    }
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
      <View style={{ marginTop: 10, marginBottom: 5, height: '90%', width: '100%' }}>
        <PlaidAuthenticator
          onMessage={this.onMessage}
          publicKey="a35fead643ab95153802609fa5c0a2"
          env="sandbox"
          product="auth,transactions"
          clientName="Manifest"
          webhook={`${NGROK}/transaction_hook`}
        />
      </View>
    );
  }

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
        userToken: this.state.userToken,
      }),
    });
    return (
      <View>
        <Text>NEXT STEP</Text>
        <View>
          <View style={{ padding: 10 }}>
            <Button raised textStyle={{ textAlign: 'center' }} title="Set Up Your Budget" />
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.status === 'CONNECTED') {
      return this.renderDetails();
    }
    return this.renderLogin();
  }
}
export default Link;
