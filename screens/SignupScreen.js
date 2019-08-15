import React from 'react';
import axios from 'axios';
import { SwitchActions, NavigationActions } from 'react-navigation';
import { Button, Grid, Row, Col } from 'native-base';
import {
  StyleSheet, View, Alert, Text, AsyncStorage,
} from 'react-native';
// import { NavigationActions, } from 'react-navigation';
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
    const { name, auth0_id } = this.state;
    const { navigation } = this.props;

    if (name) {
      this.storeData(auth0_id);
      this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'App' }));
    }
  }

  storeData = async (token) => {
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
    const authUrl = `${AUTHO_DOMAIN}/authorize${queryParams}`;
    console.log('authURL', authUrl);

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

    if (response.type === 'success') {
      this.handleResponse(response.params);
    }
  };

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
      this.handleResponse(response.params, 'login');
    }
  };

  handleResponse = (response, button) => {
    if (button === 'login') {
      if (response.error) {
        Alert('Authentication error', response.error_description || 'something went wrong');
        return;
      }

      // Retrieve the JWT token and decode it
      const jwtToken = response.id_token;
      const { name, picture, sub } = jwtDecode(jwtToken);

      console.log('JWTotken data', jwtDecode(jwtToken));

      axios.post(`${NGROK}/login`, { auth0_id: sub })
        .then((response) => {
          if (response.status === 449) {
            const { navigation } = this.props;
            navigation.reset([NavigationActions.navigate({ routeName: 'Signup' })], 0);
            navigation.navigate('Signup');
          } else {
            this.setState({ name, picture, auth0_id: sub });
          }
        });
    } else {
      if (response.error) {
        Alert('Authentication error', response.error_description || 'something went wrong');
        return;
      }

      // Retrieve the JWT token and decode it
      const jwtToken = response.id_token;
      const { name, sub, picture } = jwtDecode(jwtToken);
      
      console.log('JWTotken data', jwtDecode(jwtToken));
      
      axios.post(`${NGROK}/signup`, { name, auth0_id: sub, picture })
        .then((response) => {
          if (response.status === 300) {
            const { navigation } = this.props;
            navigation.reset([NavigationActions.navigate({ routeName: 'Signup' })], 0);
            navigation.navigate('Signup');
          } else {
            this.setState({ name, auth0_id: sub });
          }
        });
    }
  };

  render() {
    const { name } = this.state;
    const { navigation } = this.props;

    return (
   

        <Grid style={{ width: '100%', marginTop: 10 }}>
          <Row style={{ width: '100%' }}>
            <Col style={{ backgroundColor: '#fff', height: 60 }}>
              <Button style={styles.transactionButtonDark} onPress={this.login}>
                <Text style={styles.buttonText}>Log in with Auth0</Text>
              </Button>
            </Col>
            <Col style={{ backgroundColor: '#fff', height: 60 }}>
              <Button style={styles.transactionButton} onPress={this.signup}>
                <Text style={styles.buttonText}>Sign up with Auth0</Text>
              </Button>
            </Col>
          </Row>
        </Grid>

    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  transactionButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
  },
  transactionButtonDark: {
    backgroundColor: '#218771',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
  },
});

export default SignupScreen;
