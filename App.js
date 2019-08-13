/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { AppLoading, Notifications } from 'expo';
import axios from 'axios';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
import * as Permissions from 'expo-permissions';
import AppContainer from './navigation/AppNavigator.js';
import {
  FOURSQUARE_CLIENT_ID,
  FOURSQUARE_CLIENT_SECRET,
  NGROK,
  GOOGLE_OAUTH_ID,
} from './app.config.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isAuthenticated: false,
      latitude: null,
      longitude: null,
      authID: null,
      picture: null,
      name: null,
    };
  }

  async componentDidMount() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        console.log(userToken);
        this.setState({ authID: userToken });
      }
    } catch (error) {
      console.error(error);
    }
    // GET LOCATION PERMISSIONS:
    async function getLocationAsync() {
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        return navigator.geolocation.watchPosition(
          position => {
            console.log(position);
          },
          err => console.error(err),
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
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        this.setState({
          latitude,
          longitude,
        });
        
        axios
          .get(
            `https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}
          &client_secret=${FOURSQUARE_CLIENT_SECRET}
          &ll=${this.state.latitude},${this.state.longitude}
          &intent=checkin&radius=300&categoryId=4bf58dd8d48988d1e0931735&v=20190812`
          )
          .then(result => {
            // console.log('get location result from front:', result);

            return result;
          })
          .then(response => {
            const { distance } = response.data.response.venues[0].location;
            this.setState({
              dangerDistance: distance,
            });
            console.log('dangerDistance: ', this.state.dangerDistance);
          })
          .catch(err => {
            console.log('get location error from front:', err);
          });
      },
      err => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    // }, 20000);

    getLocationAsync();

    // PUSH NOTIFICATION PERMISSIONS
    let pushToken = '';
    const { authID } = this.state;
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      if (existingStatus !== 'granted') {
        console.log('permission granted');
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('permission NOT granted');
        return;
      }
      // Get the token that uniquely identifies this device
      pushToken = await Notifications.getExpoPushTokenAsync();

      axios
        .post(`${NGROK}/pushtoken`, { pushToken, authID })
        .then(result => {
          console.log('device token post result:', result.config.data);
        })
        .catch(err => {
          console.log('device token post error:', err);
        });
    }

    await registerForPushNotificationsAsync();

    const sendPushNotification = () => {
      
      axios
        .post(
          'https://exp.host/--/api/v2/push/send',
          {
            to: pushToken,
            sound: 'default',
            title: 'Manifest',
            body: "Don't you even think about going inside that CC's...",
          },
          {
            headers: {
              host: 'exp.host',
              Accept: 'application/json',
              'Accept-Encoding': 'deflate',
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => {
          console.log('notif sent: ', res);
        })
        .catch(err => console.error('notif not sent: ', err));
    };

    //sendPushNotification();

    if (this.state.dangerDistance < 300) {
      console.log('dangerDistance:', this.state.dangerDistance);
      sendPushNotification();
    } else {
      console.log('did not fire:', this.state.dangerDistance);
    }
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container>
        <AppContainer />
      </Container>
    );
  }
}

export default App;
