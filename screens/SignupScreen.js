import React from 'react';
import axios from 'axios';
import { SwitchActions, NavigationActions } from 'react-navigation';
import { Button, Grid, Row, Col, Container } from 'native-base';
import {
  StyleSheet, View, Alert, Text, AsyncStorage, Image,
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
          const { navigation } = this.props;
          if (response.status === 300) {
            navigation.reset([NavigationActions.navigate({ routeName: 'Signup' })], 0);
            navigation.navigate('Signup');
          } else {
            // this.setState({ name, auth0_id: sub });
            this.storeData(sub);
            navigation.navigate('GoalAuth', { auth: true });
          }
        });
    }
  };

  render() {
    const { name } = this.state;
    const { navigation } = this.props;

    return (
   
      <Container style={styles.container}>
        <View style={styles.viewport}>
        <Grid style={{ width: '100%', marginTop: 10 }}>
          <Row style={{ width: '100%' }}>
            <Col style={{ backgroundColor: '#fff', height: 60 }}> 
            <Text style={styles.smallText}>New to Manifest?</Text>
            <Button style={styles.transactionButton} onPress={this.signup}>
              <Text style={styles.buttonText}>Signup</Text>
            </Button>
            </Col>
            </Row>
            <Row>
            <Col style={{ backgroundColor: '#fff', height: 60 }}>
            <Text style={styles.smallText}>Already have an account?</Text>
            <Button style={styles.transactionButtonDark} onPress={this.login}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={styles.brand}>Manifest</Text>
            </Col>
          </Row>
          <Row>
            <Col>
            <Image
              style={styles.logo}
              source={require('../assets/images/ManifestLogo.png')}
            />
            </Col>
          </Row>
        <Row>
          <Col>
            <Text style={styles.smallText}>Automate your savings while quitting your vices.</Text>
          </Col>
        </Row>
        </Grid>
        </View>
        </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
  viewport: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  transactionButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'center',
    maxWidth: '80%',
    width: '80%',
    margin: 10,
  },
  transactionButtonDark: {
    backgroundColor: '#218771',
    height: 40,
    alignSelf: 'center',
    maxWidth: '80%',
    width: '80%',
    margin: 10,
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    textAlign: 'center',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 48,
    color: '#49d5b6',
    textAlign: 'center',
  },
  circle: {
    margin: 10,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#49d5b6',
    alignSelf: 'center',
    height: 150,
    maxWidth: 150,
  },
  dollar: {
    fontWeight: 'bold',
    fontSize: 48,
    color: '#49d5b6',
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 170,
    height: 170,
    marginTop: -60,
  },
});

export default SignupScreen;
