/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {
  Footer,
  FooterTab,
  Icon,
  Content,
  Button,
  Text, 
} from 'native-base';
import PlaidAuthenticator from 'react-native-plaid-link';
import {
  storeData,
  getData,
  storeMulti,
  getMulti, 
} from './helpers/asyncHelpers';
import { NGROK } from '../app.config.json';

class PlaidScreen extends React.Component {
  constructor(props) {
    super(props);
    const auth = (this.props.navigation.state.params.auth || false);
    this.state = {
      auth: auth,
      data: {},
      status: '',
      userToken: null,
      appState: AppState.currentState
    };
  }

  async componentWillMount() {
    try {
      const userToken = await getData('userToken');
      if (userToken !== null) {
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
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase(),
    });
  };

  async doStuff() {
    const { status } = this.state;
    if (status === 'CONNECTED') {
      const { userToken, auth, data: { metadata: { public_token } } } = this.state;
      const { navigation: { navigate } } = this.props;

      await axios.post(`${NGROK}/get_access_token`, {
        public_token,
        userToken,
      });

      await axios.post(`${NGROK}/auth`, {
        userToken,
      });

      if (auth) {
        navigate('AccountAssign', { auth: true });
      } else {
        navigate('Home');
      }
    }
  }

  render() {
    const { navigation: { navigate, openDrawer } } = this.props;

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
              <TouchableOpacity onPress={() => navigate('Stats')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
                <Text style={styles.buttonText}>Stats</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => navigate('Games')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
                <Text style={styles.buttonText}>Games</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => navigate('Goals')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-ribbon" />
                <Text style={styles.buttonText}>Goals</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={openDrawer}>
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
