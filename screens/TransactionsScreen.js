/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Text,
  Button,
  Footer,
  FooterTab,
  Icon,
  Content,
  Grid,
  Col,
  Row,
} from 'native-base';
import axios from 'axios';
import TransactionItem from './subViews/TransactionItem';
import { NGROK } from '../app.config.json';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      transactions: [
        {
          id: 1,
          id_user: 4,
          status: 'pending',
          name: 'BlashBfashja',
          day: '2019-07-17T11:00:00.000Z',
          amount: '4.33',
          transaction_id: 'P3voBrVXlBFqMB7ya1bdFRko8nQo1pt7lBK8r',
          createdAt: '2019-08-10T17:22:55.904Z',
          updatedAt: '2019-08-10T17:22:55.904Z',
        },
        {
          id: 1,
          id_user: 4,
          status: 'pending',
          name: "CC's",
          day: '2019-07-18T02:37:00.000Z',
          amount: '3.99',
          transaction_id: 'P3voBrVXlBFqMB7ya1bdFRko8nQo1pt7lBK8r',
          createdAt: '2019-08-10T17:22:55.904Z',
          updatedAt: '2019-08-10T17:22:55.904Z',
        },
        {
          id: 1,
          id_user: 4,
          status: 'pending',
          name: 'Starbucks',
          day: '2019-07-18T08:12:00.000Z',
          amount: '4.99',
          transaction_id: 'P3voBrVXlBFqMB7ya1bdFRko8nQo1pt7lBK8r',
          createdAt: '2019-08-10T17:22:55.904Z',
          updatedAt: '2019-08-10T17:22:55.904Z',
        },
      ],
    };
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
    axios.get(`${NGROK}/transactions/${this.state.userToken}`).then(transactions => {
      this.setState({ transactions });
    });
  }

  render() {
    const { transactions } = this.state;

    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <Text style={styles.heading}>Transactions</Text>
          <Text style={styles.smallTextGreen}>
            These transactions look a little suspicious... Still sticking to your goals?
          </Text>
          {transactions.map(transaction => (
            <TransactionItem transaction={transaction} />
          ))}
        </View>
        <Footer style={styles.footerbar}>
          <FooterTab style={{ backgroundColor: '#49d5b6' }}>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
              <Text style={styles.buttonText}>Stats</Text>
            </Button>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
              <Text style={styles.buttonText}>Games</Text>
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
