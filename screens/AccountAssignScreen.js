import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, ScrollView, AsyncStorage,
} from 'react-native';
import {
  Container, Text, Button, Footer, FooterTab, Icon,
} from 'native-base';
import axios from 'axios';
import BankItem from './subViews/BankItem.js';
import { NGROK } from '../app.config.json';

export default class AccountAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      accounts: [],
    };

    this.getAccounts = this.getAccounts.bind(this);
    this.renderAccounts = this.renderAccounts.bind(this);
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
    this.getAccounts();
  }

  getAccounts() {
    const { userToken } = this.state;
    axios.get(`${NGROK}/accounts/${userToken}`)
      .then(({ data: accounts }) => {
        this.setState({ accounts });
      });
  }

  renderAccounts() {
    const { accounts } = this.state;

    if (accounts.length) {
      return accounts.map((response) => {
        const account = JSON.parse(response);
        return (
          <BankItem
            key={account.account_id}
            officialName={account.officialName}
            subType={account.subtype}
            name={account.name}
          />
        );
      });
    }
    return null;
  }

  render() {
    const {
      container,
      viewport,
      title,
      heading,
      largeText,
      smallText,
      smallTextGreen,
      smallTextLeft,
      accountButton,
      buttonText,
      accountColumns,
      footerbar,
    } = styles;

    return (
      <Container style={container}>
        <View style={viewport}>
          <ScrollView>
            <Text style={heading}>Account Selection</Text>
            <Text style={smallTextGreen}>
              Please select an account for us to draw from
          </Text>
            {this.renderAccounts()}
          </ScrollView>
        </View>
        <Footer style={footerbar}>
          <FooterTab style={{ backgroundColor: '#49d5b6' }}>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
                <Text style={buttonText}>Stats</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Games')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
                <Text style={buttonText}>Games</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Goals')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-ribbon" />
                <Text style={buttonText}>Goals</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-menu" />
                <Text style={buttonText}>Menu</Text>
              </TouchableOpacity>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
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
  viewport: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#49d5b6',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#49d5b6',
    marginBottom: 10,
    marginTop: 12,
    textAlign: "center",
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
  },
  smallTextLeft: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    alignSelf: 'flex-start',
  },
  smallTextGreen: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#49d5b6',
    textAlign: 'center',
  },
  smallTextLeft: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  accountButton: {
    backgroundColor: '#49d5b6',
    height: 60,
    alignSelf: 'flex-start',
    maxWidth: '96%',
    width: '96%',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  accountColumns: {
    backgroundColor: '#fff',
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
});
