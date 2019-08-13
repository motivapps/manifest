import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View, TouchableOpacity,
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

const TransactionItem = (props) => {
  const { transaction, onDeny } = props;

  return (
    <Grid style={{ marginBottom: 0, width: '100%', padding: 0 }}>
      <Row style={{ backgroundColor: '#fff', height: 20 }} />
      <Text style={styles.smallTextLeft}>
        {transaction.day.slice(5, 10)}
-
        {transaction.day.slice(0, 4)}
        {' '}
-
        {' '}
        {transaction.day.slice(11, 16)}
      </Text>

      <Text style={styles.smallTextLeft}>
        {transaction.name}
        {' '}
- $
        {transaction.amount}
        {' '}
-
        {' '}
        {transaction.status}
      </Text>

      <Row style={{ backgroundColor: '#fff', height: 20 }} />
      <Row style={{ marginBottom: 0, width: '100%' }}>
        <Col style={{ backgroundColor: '#fff', height: 60 }}>
          <TouchableOpacity onPress={onDeny}>
            <Button style={styles.transactionButton}>
              <Text style={styles.buttonText}>It's not what it looks like</Text>
            </Button>
          </TouchableOpacity>
        </Col>
        <Col style={{ backgroundColor: '#fff', height: 60 }}>
          <Button style={styles.transactionButton}>
            <Text style={styles.buttonText}>Oops, I relapsed</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  );
};

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
    marginLeft: 30,
    marginRight: 30,
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

export default TransactionItem;
