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
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

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

// import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      buttonToggle: false,
      isAuthenticated: false,
      latitude: null,
      longitude: null,
      dangerDistance: null,
      pushToken: null,
      authID: GOOGLE_OAUTH_ID,
      primaryGoal: {},
    };
    this.onToggleButton = this.onToggleButton.bind(this);
    this.setState = this.setState.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
    this.getGoal();
  }

  onToggleButton() {
    this.setState({
      buttonToggle: !this.state.buttonToggle,
    });
  }

  async getGoal() {
    const auth0_id = await getData('userToken');
    let primaryGoal = await getData('primaryGoal');

    if (!primaryGoal) {
      primaryGoal = await axios.get(`${NGROK}/goals/${auth0_id}`);
      storeData('primaryGoal', primaryGoal);
    }

    this.setState({
      auth0_id,
      primaryGoal,
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <Text style={styles.heading}>Goal: Fancy Pants Kayak</Text>

          <Image style={styles.mainImage} source={require('../assets/images/kayak.jpg')} />

          <Progress.Bar
            progress={0.66}
            width={240}
            color="#49d5b6"
            unfilledColor="#cccccc"
            height={24}
          />
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.smallText}>Projected Completion Date: 9/14/19</Text>
          </View>
          <View style={{ marginBottom: 10, marginLeft: -70 }}>
            <Text style={styles.largeText}>Money Saved: $248</Text>
            <Text style={styles.largeText}>Current Streak: 79 days</Text>
          </View>

          <Text style={styles.smallTextLeft}>Relapses: 3</Text>
          <Text style={styles.smallTextLeft}>Money Lost: $22.35</Text>
          <Text style={styles.smallTextLeft}>Setback: 6 days</Text>
          <Text style={styles.smallTextGreenLeft}>Savings Projection: $597.11</Text>
          <Grid style={{ width: '100%', marginTop: 10 }}>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}>
                  <Text style={styles.buttonText}>3 months</Text>
                </Button>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}>
                  <Text style={styles.buttonText}>6 months</Text>
                </Button>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}>
                  <Text style={styles.buttonText}>1 year</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
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
    marginLeft: 0,
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
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
  mainImage: {
    width: 200,
    height: 200,
    backgroundColor: '#49d5b6',
    margin: 10,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#49d5b6',
  },
});

export default HomeScreen;
