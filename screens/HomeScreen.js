import React from 'react';
import { AppLoading, Notifications } from 'expo';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import * as Font from 'expo-font';
import { kayak } from '../assets/images/kayak.jpg';
import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET, NGROK, GOOGLE_OAUTH_ID, PUSH_TOKEN } from '../app.config.json';
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
      authID: GOOGLE_OAUTH_ID,
    };
    this.onToggleButton = this.onToggleButton.bind(this);
    this.setState = this.setState.bind(this);
    console.log(props);
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  async componentDidMount() {
    // GET LOCATION PERMISSIONS:
    async function getLocationAsync() {
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        return navigator.geolocation.watchPosition(
          (position) => {
            console.log(position);
          },
          (err) => console.error(err),
          { timeout: 2000, maximumAge: 2000, enableHighAccuracy: true, distanceFilter: 1 }
        );
      } 
        throw new Error('Location permission not granted');
    }

    // setInterval(() => {
    navigator.geolocation.watchPosition(
      position => {
        // console.log('position outside of permissions', position);
        // console.log('authID', this.state.authID);
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // fetch(`https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&ll=${this.state.latitude},${this.state.longitude}&intent=checkin&radius=60&categoryId=4bf58dd8d48988d1e0931735&v=20190425`)
        //   .then(result => {
        //     //console.log('get location result from front:', result);
        //     return result.json();
        //   })
        //   .then(response => {
        //     //console.log('response:', response);
        //     console.log('location distance:', response.response.venues[0].location.distance);
        //     let distance = response.response.venues[0].location.distance;
        //     this.setState({
        //       dangerDistance: response.response.venues[0].location.distance,
        //     })
        //   })
        //   .catch(err => {
        //     console.log('get location error from front:', err);
        //   })
      },
      err => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    // }, 20000);

    getLocationAsync();

    // PUSH NOTIFICATION PERMISSIONS
    const {authID} = this.state;
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      // Get the token that uniquely identifies this device
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('token:', token);

      axios
        .post(`${NGROK}/pushtoken`, { pushToken: token, authID })
        .then(result => {
          console.log('device token post result:', result.config.data);
        })
        .catch(err => {
          console.log('device token post error:', err);
        });
    }

    registerForPushNotificationsAsync();

    sendPushNotification = () => {
      const response = fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: PUSH_TOKEN,
          sound: 'default',
          title: 'Manifest',
          body: "Don't you even think about going inside that CC's...",
        }),
      });
    };

    if (this.state.dangerDistance < 60) {
      console.log('dangerDistance:', this.state.dangerDistance);
      sendPushNotification();
    } else {
      console.log('did not fire:', this.state.dangerDistance);
    }
    this.setState({ isReady: true });

    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  onToggleButton() {
    this.setState({
      buttonToggle: !this.state.buttonToggle,
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Home</Text>
        <Text style={styles.title}>Manifest</Text>
        <Text>It's alive!</Text>
        <Text>My Latitude: {this.state.latitude}</Text>
        <Text>My Longitude: {this.state.longitude}</Text>
        <Button style={styles.basicButton} onPress={this.onToggleButton}>
          <Text style={styles.buttonText}>Do Not Click Me!</Text>
        </Button>
        {this.state.buttonToggle ? (
          <Text style={styles.message}>I said don't click me!</Text>
        ) : null}
        <Image
          style={{ width: 50, height: 50 }}
          source={kayak}
        />
        <Content />
        <Footer style={styles.footerbar}>
          <FooterTab style={{ backgroundColor: '#49d5b6' }}>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
              <Text style={styles.buttonText}>Stats</Text>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
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
  title: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 20,
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

export default HomeScreen;
