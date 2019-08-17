import React from 'react';
import { AppLoading, Notifications } from 'expo';
import {
  Container,
  Text,
  Button,
  Footer,
  FooterTab,
  Icon,
  Content,
  Grid,
  Row,
  Col,
} from 'native-base';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';

import * as Font from 'expo-font';
import * as Progress from 'react-native-progress';
import { kayak } from '../assets/images/kayak.jpg';
import {
  FOURSQUARE_CLIENT_ID,
  FOURSQUARE_CLIENT_SECRET,
  NGROK,
  GOOGLE_OAUTH_ID,
  PUSH_TOKEN,
} from '../app.config.json';
import { storeData, getData, storeMulti, getMulti } from './helpers/asyncHelpers';
import PropTypes from 'prop-types';

// import { MonoText } from '../components/StyledText';

class GoalsSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      primaryGoal: null,
      threeMonthSavings: null,
      sixMonthSavings: null,
      oneYearSavings: null,
      displayedSavings: 0,
      completionDate: null,
    };
    this.setState = this.setState.bind(this);
  }

  async componentWillMount() {
    const auth0_id = await getData('userToken');

    axios.get(`${NGROK}/goals/${auth0_id}`).then((response) => {
      this.setState({
        auth0_id,
        primaryGoal: response.data[0],
      });
      console.log('primaryGoal:', this.state.primaryGoal);
      if (response.data[0].vice_freq === 'Daily') {
        this.setState({
          threeMonthSavings: (response.data[0].vice_price * 91.25).toFixed(2),
          sixMonthSavings: (response.data[0].vice_price * 182.5).toFixed(2),
          oneYearSavings: (response.data[0].vice_price * 365).toFixed(2),
          displayedSavings: (response.data[0].vice_price * 91.25).toFixed(2),
        });
      }

      const daysLeft = (response.data[0].goal_cost - response.data[0].amount_saved) / response.data[0].vice_price;
      console.log(daysLeft);
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + daysLeft);

      // So you can see the date we have created
      console.log('targetDate:', targetDate);

      const dd = targetDate.getDate();
      const mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      const yyyy = targetDate.getFullYear();

      var dateString = mm + "/" + dd + "/" + yyyy;
      console.log('date:', dateString);
      this.setState({ completionDate: dateString });

      if (response.data[0]) {
        storeData('primaryGoal', JSON.stringify(response.data[0]));
      }
    }).catch(error => console.log(error));
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ isReady: true });
  }

  // async componentDidUpdate() {
  //   const primaryGoal = await getData('primaryGoal');
  //   const auth0_id = await getData('userToken');

  //   this.state.auth0_id = auth0_id;
  //   this.state.primaryGoal = primaryGoal;
  // }


  render() {
    // console.log('state:', this.state);
    const { primaryGoal, isReady, displayedSavings, threeMonthSavings, sixMonthSavings, oneYearSavings, completionDate } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <ScrollView>
            <Text style={styles.heading}>My Goals</Text>

            <Grid style={{ width: '100%', marginTop: 10 }}>
              <Row style={{ width: '100%' }}>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButton} onPress={() => this.props.navigation.navigate('Goals')}>
                    <Text style={styles.buttonText}>Set New Goal</Text>
                  </Button>
                </Col>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButtonDark}>
                    <Text style={styles.buttonText}>Current Goals</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
 
            <Text style={styles.heading}>Goal: {primaryGoal ? primaryGoal.goal_name : 'No goal set'} </Text>
            <Text style={styles.headingGray}>Category: {primaryGoal ? primaryGoal.vice : 'No vice selected'}</Text>

            <Progress.Circle 
              size={30}
              progress={primaryGoal ? primaryGoal.amount_saved / primaryGoal.goal_cost : 0}
              color="#49d5b6"
              unfilledColor="#cccccc"
              size={250}
              showsText={true}
              style={{ alignSelf: 'center', margin: 10 }}
              textStyle={{ fontWeight: 'bold' }}
              thickness={8}
              />

            <Image style={styles.mainImage} source={{ uri: primaryGoal ? primaryGoal.goal_photo : "http://cdn.shopify.com/s/files/1/0682/0839/products/Vibe-Yellowfin-100-Kayak-Caribbean_Journey_grande.jpg?v=1555360419" }} />

            
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={styles.smallText}>Projected Completion Date: {completionDate ? completionDate : 'Loading...'}</Text>
              <Text style={styles.smallTextLeft}>Daily Savings: ${primaryGoal ? primaryGoal.daily_savings.toFixed(2) : 0}</Text>
            </View>
            <View style={{ marginBottom: 10, marginLeft: 0 }}>
              <Text style={styles.largeText}>Goal Amount: ${primaryGoal ? primaryGoal.goal_cost : 0}</Text>
              <Text style={styles.largeText}>Money Saved: ${primaryGoal ? primaryGoal.amount_saved : 0}</Text>
            </View>

            <Grid style={{ width: '100%', marginTop: 10 }}>
              <Row style={{ width: '100%' }}>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButton}>
                    <Text style={styles.buttonText}>Edit Goal</Text>
                  </Button>
                </Col>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButtonDark}>
                    <Text style={styles.buttonText}>Delete Goal</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
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
    fontSize: 16,
    color: '#49d5b6',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#49d5b6',
    marginTop: 10,
    textAlign: 'center',
  },
  headingGray: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#4c4c4c',
    marginBottom: 4,
    marginTop: 6,
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
    marginTop: 6,
  },
  smallTextGreenLeft: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  basicButton: {
    backgroundColor: '#49d5b6',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  transactionButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
  },
  transactionButtonDark: {
    backgroundColor: '#218771',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
  mainImage: {
    width: 250,
    height: 250,
    backgroundColor: '#49d5b6',
    margin: 10,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: '#49d5b6',
    alignSelf: 'center',
    marginTop: -260,
    zIndex: -100,
    opacity: 0.15,
  },
});

export default GoalsSummaryScreen;
