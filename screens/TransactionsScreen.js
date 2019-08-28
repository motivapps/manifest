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
import footer from './subViews/Footer';


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
      .then(() => {
        this.getTransactions();
      });
  }

  onRelapse(transaction) {
    const { userToken } = this.state;
    axios.patch(`${NGROK}/accept_transaction/${userToken}`, transaction)
      .then(() => {
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
      heading,
      smallTextGreen,
      buttonText,
      footerbar,
    } = styles;
    const { isReady } = this.state;
    const context = this;
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
          {footer(context)}
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
    textAlign: 'center',
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
    paddingTop: 5,
  },
});
