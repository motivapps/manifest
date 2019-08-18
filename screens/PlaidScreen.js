/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
 StyleSheet, View, Alert, TouchableOpacity, AppState,
} from 'react-native';
import {
 Container, Footer, FooterTab, Icon, Content, Button, Text 
} from 'native-base';
import {
 storeData, getData, storeMulti, getMulti 
} from './helpers/asyncHelpers';
// import Link from './subViews/PlaidLink';
import PlaidAuthenticator from 'react-native-plaid-link';
import { NGROK } from '../app.config.json';
import axios from 'axios';

class PlaidScreen extends React.Component {
  constructor(props) {
    super(props);
    const { auth } = this.props.navigation.state.params;
    this.state = {
      auth: (auth || false),
      data: {},
      status: '',
      userToken: null,
      appState: AppState.currentState
    };

    // this.redirect = this.redirect.bind(this);
  }

  async componentWillMount() {
    try {
      const userToken = await getData('userToken');
      if (userToken !== null) {
        console.log(userToken);
        this.setState({ userToken });
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate() {
    this.doStuff();
  }

  onMessage = (data) => {
    console.log(data);
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase(),
    });
  };

  async doStuff() {
    const { status } = this.state;
    console.log(status, 'status');
    if (status === 'CONNECTED') {
      const { userToken, auth, data: { metadata: { public_token } } } = this.state;
      const { navigation } = this.props;

      await axios.post(`${NGROK}/get_access_token`, {
        public_token,
        userToken,
      });

      await axios.post(`${NGROK}/auth`, {
        userToken,
      });

      if (auth) {
        navigation.navigate('AccountAuth', { auth: true });
      } else {
        navigation.navigate('Home');
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <Content />
        <Footer style={styles.footerbar}>
          <FooterTab style={{ backgroundColor: '#49d5b6' }}>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
                <Text style={styles.buttonText}>Stats</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Games')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
                <Text style={styles.buttonText}>Games</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Goals')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-ribbon" />
                <Text style={styles.buttonText}>Goals</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-menu" />
                <Text style={styles.buttonText}>Menu</Text>
              </TouchableOpacity>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  basicButton: {
    backgroundColor: '#34d1af',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PlaidScreen;
