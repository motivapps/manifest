/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, ScrollView, AsyncStorage,
} from 'react-native';
import {
  Container, Text, Button, Footer, FooterTab, Icon,
} from 'native-base';
import axios from 'axios';
import TransactionItem from './subViews/TransactionItem';
import { NGROK } from '../app.config.json';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      transactions: [],
      isReady: false,
    };
    this.onDenyGuilt = this.onDenyGuilt.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.onRelapse = this.onRelapse.bind(this);
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
    this.getTransactions();
    this.setState({
      isReady: true,
    })
  }


  onDenyGuilt(transaction) {
    const { userToken } = this.state;
    axios.patch(`${NGROK}/deny_transaction/${userToken}`, transaction)
      .then((response) => {
        this.getTransactions();
      });
  }

  onRelapse(transaction) {
    const { userToken } = this.state;
    axios.patch(`${NGROK}/accept_transaction/${userToken}`, transaction)
      .then((response) => {
        this.getTransactions();
      });
  }

  getTransactions() {
    const { userToken } = this.state;
    axios.get(`${NGROK}/transactions/${userToken}`).then(({ data: transactions }) => {
      const pending = transactions.filter(transaction => transaction.status === 'pending');
      this.setState({ transactions: pending });
    });
  }

  renderTransactions() {
    const { transactions } = this.state;

    if (transactions.length) {
      return transactions.map(transaction => (
        <TransactionItem
          key={transaction.transaction_id}
          transaction={transaction}
          onDeny={this.onDenyGuilt}
          onRelapse={this.onRelapse}
        />
      ));
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
      transactionButton,
      buttonText,
      transactionColumns,
      footerbar,
    } = styles;
    const { isReady } = this.state;
    if (isReady) {

      return (
        <Container style={container}>
          <View style={viewport}>
            <ScrollView>
              <Text style={heading}>Transactions</Text>
              <Text style={smallTextGreen}>
              These transactions look a little suspicious... Still sticking to your goals?
            </Text>
              {this.renderTransactions()}
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
    return null;
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
  transactionButton: {
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
  transactionColumns: {
    backgroundColor: '#fff',
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
});
