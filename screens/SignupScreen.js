import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Icon, Content, Button, Text } from 'native-base';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { AUTHO_CLIENT_ID, AUTHO_DOMAIN, NGROK } from '../app.config.json';
import Auth0 from './subViews/Auth0';

function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
    this.go = this.go.bind(this);
  }

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
    const authUrl = `${AUTHO_DOMAIN}/authorize` + queryParams;
    console.log('authURL', authUrl);

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

    if (response.type === 'success') {
      this.handleResponse(response.params);
    }
  };

  handleResponse = (response) => {
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

  go() {
    const { name, picture, auth0_id } = this.state;
    this.props.navigation.navigate('Home', { name, picture, auth0_id })
  }

  render() {
    const { name } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
      {/* <Content /> */}
        <Auth0 style={{ marginBottom: 30 }} callback={this.signup} goToApp={this.go} name={name} type='signup' />
        {/* <Footer style={styles.footerbar}>
          <FooterTab>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
              <Text style={styles.buttonText}>Stats</Text>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
                <Text style={styles.buttonText}>Games</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="md-ribbon" />
              <Text style={styles.buttonText}>Goals</Text>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-menu" />
                <Text style={styles.buttonText}>Menu</Text>
              </TouchableOpacity>
            </Button>
          </FooterTab>
        </Footer> */}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 0,
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   footerbar: {
//     backgroundColor: '#49d5b6',
//     fontWeight: 'bold',
//     color: '#fff',
//   }
// });

export default SignupScreen;