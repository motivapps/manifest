/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
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

import { ProgressChart, BarChart } from 'react-native-chart-kit';

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Relapse', 'Coffee', 'Smoking'], // optional
        data: [0.3, 0.6, 0.8]
      },
      barchartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [20, 45, 28, 80, 99, 43]
        }]
      },
    };
  }

  render() {
    const { data, barchartData } = this.state;

    
    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <Text style={styles.heading}>My Progress</Text>

          <ProgressChart style={{alignItems: 'center'}}
            data={data}
            width={350}
            height={180}
            chartConfig={chartConfig}
          />

          <Text style={styles.smallTextGreen}>Total Savings to Date: $$468.21</Text>
          <Text style={styles.smallTextGreen}>Relapse Total to Date: $$87.16</Text>

          <BarChart
            data={barchartData}
            width={330}
            height={180}
            yAxisLabel={'$'}
            chartConfig={chartConfig}
          />

          <Grid style={{ width: '100%', marginTop: 10 }}>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}><Text style={styles.buttonText}>3 months</Text></Button>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}><Text style={styles.buttonText}>6 months</Text></Button></Col>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}><Text style={styles.buttonText}>1 year</Text></Button></Col>
            </Row>
          </Grid>

        </View>
        <Footer style={styles.footerbar}>
          <FooterTab>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
                <Text style={styles.buttonText}>Stats</Text>
              </TouchableOpacity>
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
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(33, 135, 113, ${opacity})`,
  strokeWidth: 2 // optional, default 3
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
    height: 40,
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