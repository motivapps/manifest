import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Icon, Content, Button, Text } from 'native-base';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { AUTHO_CLIENT_ID, AUTHO_DOMAIN, NGROK } from '../app.config.json';
import Auth0 from './subViews/Auth0';

function toQueryString(params) {
  return `?${Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')}`;
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
    this.go = this.go.bind(this);
  }

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: AUTHO_CLIENT_ID,
      redirect_uri: redirectUrl,
      response_type: 'id_token', // id_token will return a JWT token
      scope: 'openid profile', // retrieve the user's profile
      nonce: 'nonce', // ideally, this will be a random value
    });
    const authUrl = `${AUTHO_DOMAIN}/authorize${queryParams}`;
    console.log('authURL', authUrl);

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

    if (response.type === 'success') {
      this.handleResponse(response.params);
    }
  };

  handleResponse = response => {
    if (response.error) {
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const { name, picture, sub } = jwtDecode(jwtToken);
    this.setState({ name, picture, auth0_id: sub });

    console.log('JWTotken data', jwtDecode(jwtToken));

    axios.post(`${NGROK}/login`, { name, auth0_id: sub, picture });
  };

  go() {
    const { name, picture, auth0_id } = this.state;
    this.props.navigation.navigate('Home', { name, picture, auth0_id })
  }

  render() {
    const { name } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Auth0
          style={{ marginBottom: 30 }}
          callback={this.login}
          name={name}
          goToApp={this.go}
          type="login"
        />
      </View>
    );
  }
}

export default LoginScreen;
