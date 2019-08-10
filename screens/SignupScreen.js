import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Alert, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { Container, Footer, FooterTab, Icon, Content, Button, Text } from 'native-base';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { AUTHO_CLIENT_ID, AUTHO_DOMAIN, NGROK } from '../app.config.json';
import Auth0 from './subViews/Auth0';

function toQueryString(params) {
  return `?${Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')}`;
}

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      picture: '',
      auth0_id: '',
    };
    this.storeData = this.storeData.bind(this);
  }

  componentDidUpdate() {
    const { name, picture, auth0_id } = this.state;
    const { navigation } = this.props;

    if (name) {
      this.storeData(auth0_id);
      navigaiton.dispatch(
        navigation.navigate({
          routeName: 'App',
          action: NavigationActions.setParams(this.state),
        })
      );
    }
  }

  storeData = async token => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      navigation.navigate('Signup');
    }
  };

  signup = async () => {
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
    const authUrl = `${AUTHO_DOMAIN}/authorize${  queryParams}`;
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

    axios.post(`${NGROK}/signup`, { name, auth0_id: sub, picture });
  };

  render() {
    const { name } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Auth0 style={{ marginBottom: 30 }} callback={this.signup} name={name} type="signup" />
      </View>
    );
  }
}

export default SignupScreen;
