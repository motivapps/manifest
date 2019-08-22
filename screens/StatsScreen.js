/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Text,
  Button,
  Footer,
  FooterTab,
  Icon,
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';

import { ProgressChart, BarChart } from 'react-native-chart-kit';
import { NGROK } from '../app.config.json';
import { storeData, getData } from './helpers/asyncHelpers';

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circleData: {
        labels: ['Relapses', 'Vice'], // optional
        data: [0, 0],
      },
      barchartData: {
        labels: ['Daily', 'Weekly', 'Monthly'],
        datasets: [{
          data: [2, 12, 38],
        }],
      },
      primaryGoal: null,
    };
    this.updateAsyncStorageForStats = this.updateAsyncStorageForStats.bind(this);
  }

  async componentWillMount() {
    this.updateAsyncStorageForStats();
  }

  async updateAsyncStorageForStats() {
    const auth0_id = await getData('userToken');

    axios.get(`${NGROK}/goals/${auth0_id}`).then((response) => {
      console.log('response:', response.data[0]);
      let primaryGoal = response.data[0];
      this.setState({
        primaryGoal: response.data[0],
      });
      console.log('primaryGoal:', primaryGoal);
      if (primaryGoal !== null) {
        let relapseTotal = primaryGoal.relapse_cost_total / primaryGoal.goal_cost;
        console.log('amount:', primaryGoal.amount_saved);
        let savedTotal = primaryGoal.amount_saved / primaryGoal.goal_cost;

        const dailySavings = primaryGoal.daily_savings;
        console.log('goal:', primaryGoal);
        this.setState({
          circleData: {
            labels: ['Relapses', primaryGoal.vice],
            data: [relapseTotal, savedTotal],
          },
          barchartData: {
            labels: ['Daily', 'Weekly', 'Monthly'],
            datasets: [{
              data: [dailySavings, dailySavings * 7, dailySavings * 30],
            }],
          },
        });
      }

      if (response.data[0]) {
        storeData('primaryGoal', JSON.stringify(response.data[0]));
      }
    }).catch(error => console.log(error));
  }

  render() {
    const { circleData, barchartData, primaryGoal } = this.state;

    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <NavigationEvents
            onWillFocus={this.updateAsyncStorageForStats}
          />
          <Text style={styles.heading}>My Progress</Text>

          <ProgressChart
            data={circleData}
            width={350}
            height={180}
            chartConfig={chartConfig}
          />

          <Text style={styles.smallText}>Total Savings to Date: ${primaryGoal ? primaryGoal.amount_saved : 0}</Text>
          <Text style={styles.smallText}>Relapse Total to Date: ${primaryGoal ? primaryGoal.relapse_cost_total : 0}</Text>

          <BarChart
            data={barchartData}
            width={330}
            height={180}
            yAxisLabel={'$'}
            chartConfig={chartConfig}
          />

          <Text style={styles.smallText}>Savings Potential Based on Daily Savings</Text>

        </View>
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
      </Container>
    );
  }
}
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(33, 135, 113, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  style: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
