import React from 'react';
import axios from 'axios';
import { SwitchActions } from 'react-navigation';
import { StyleSheet, View, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: null,
  //   };
  //   this.storeData = this.storeData.bind(this);
  // }

  // componentDidUpdate() {
  //   // const { auth0_id } = this.state;

  //   if (this.state.name) {
  //     this.storeData(this.state.auth0_id);
  //     // this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'App' }));
  //     this.props.navigate('App');
  //   }
  // }

  // storeData = async token => {
  //   try {
  //     await AsyncStorage.setItem('userToken', token);
  //   } catch (error) {
  //     navigation.navigate('Signup');
  //   }
  // };

  

  // handleResponse = response => {
    // if (response.error) {
    //   Alert('Authentication error', response.error_description || 'something went wrong');
    //   return;
    // }

    // // Retrieve the JWT token and decode it
    // const jwtToken = response.id_token;
    // const { name, sub } = jwtDecode(jwtToken);
    // this.setState({ name, auth0_id: sub });

    // console.log('JWTotken data', jwtDecode(jwtToken));

    // axios.post(`${NGROK}/login`, { auth0_id: sub });
  // };

  render() {
    const { name } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Auth0 style={{ marginBottom: 30 }} callback={this.login} name={name} type="login" />
      </View>
    );
  }
}

export default LoginScreen;
