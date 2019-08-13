/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import { AppLoading, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from 'axios';
import { Container } from 'native-base';
import AppContainer from './navigation/AppNavigator.js';
import {
  FOURSQUARE_CLIENT_ID,
  FOURSQUARE_CLIENT_SECRET,
  NGROK,
  GOOGLE_OAUTH_ID,
} from './app.config.json';

let pushToken = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      locationGranted: false,
      dangerDistance: null,
      latitude: null,
      longitude: null,
      authID: null,
    };
    this.getLocationAsync = this.getLocationAsync.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
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
    // LOCATION PERMISSIONS
    await this.getLocationAsync();
    // PUSH NOTIFICATION PERMISSIONS
    await this.registerForPushNotificationsAsync();

    this.setState({ isReady: true });
  }


  // GET LOCATION PERMISSIONS:
  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Location permissions not granted');
    } else {
      this.setState({ locationGranted: true });
    }
    const { locationGranted } = this.state;
    if (locationGranted) {
      await Location.startLocationUpdatesAsync('callFoursquare', {
        accuracy: Location.Accuracy.Highest,
        // distanceInterval: 50, // update every 50 meters, will want a bigger number eventually but this is nice for testing
        showsBackgroundLocationIndicator: true,
      })
        .then((distance) => {
          console.log('Distance coming from foursquare: ', distance);
        });
    }
  }

  // GET NOTIF PERMISSIONS:
  async registerForPushNotificationsAsync() {
    const { authID } = this.state;
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
      .then((result) => {
        console.log('device token post result:', result.config.data);
      })
      .catch((err) => {
        console.log('device token post error:', err);
      });
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

// FOURSQUARE AND NOTIFICATION FUNCTIONS (running in background):
TaskManager.defineTask('callFoursquare', ({ data: { locations }, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('NEW LOCATIONS: ', locations);
  // Unsure which to use... locations.length - 1 or locations[0]? Which is newest?
  const lat = locations[0].coords.latitude;
  const log = locations[0].coords.longitude;
  // THIS IS STILL ONLY LOOKING FOR COFFEE SHOPS WITHIN 300 METER RADIUS
  axios
    .get(
      `https://api.foursquare.com/v2/venues/search?client_id=USVL34WDRM322JXRDHU4EQW1QREZGPXOMTZSNJKYQUIGKE5O
          &client_secret=2KGK1VOONWZ1T0OMNFKWXFHDOP0JYXPIVYXQ5KKUDXA55ZHQ
          &ll=${lat},${log}
          &intent=checkin&radius=300&categoryId=4bf58dd8d48988d1e0931735&v=20190812`,
    )
    .then((response) => {
      const { distance } = response.data.response.venues[0].location;
      console.log('Foursquare worked!', response.data.response.venues[0]);

      if (distance < 100) {
      // User is close to coffee shop, send notification
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
            },
          )
          .then((res) => {
            console.log('notif sent:');
          })
          .catch(err => console.error('notif not sent: ', err));
      }
    })
    .catch(err => console.error('get location error from front:', err));
});

export default App;
