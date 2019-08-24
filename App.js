/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
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
let primaryGoal = '';
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
    primaryGoal = await AsyncStorage.getItem('primaryGoal');
    primaryGoal = JSON.parse(primaryGoal);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
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
    
    if (Platform.OS === 'android' && primaryGoal !== null) {
      if (locationGranted) {
        await Location.startLocationUpdatesAsync('callFoursquare', {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 10, // update every 10 meters, will want a bigger number eventually but this is nice for testing
          deferredUpdatesDistance: 20,
          showsBackgroundLocationIndicator: true,
          timeInterval: 30000,
        });
      }
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
        // console.log('device token post result:', result.config.data);
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
  
  // Unsure which to use... locations.length - 1 or locations[0]? Which is newest?
  const lat = locations[0].coords.latitude;
  const log = locations[0].coords.longitude;
  let category = '';
  let purchase = '';
  if (primaryGoal.vice === 'Coffee') {
    // coffee shops
    category = '4bf58dd8d48988d1e0931735';
    purchase = 'a cup of joe.';
  } else if (primaryGoal.vice === 'Smoking') {
    // smoke shops, vape shops, and convenience stores
    category = '4bf58dd8d48988d123951735,56aa371be4b08b9a8d57355c,4d954b0ea243a5684a65b473';
    purchase = 'cancer sticks.';
  } else {
    // fast food
    category = '4bf58dd8d48988d16e941735';
    purchase = 'that deadly food.';
  }
  
  axios
    .get(
      `https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}
          &client_secret=${FOURSQUARE_CLIENT_SECRET}
          &ll=${lat},${log}
          &intent=checkin&radius=300&categoryId=${category}&v=20190812`,
    )
    .then((response) => {
      console.log('category: ', category)
      const { distance } = response.data.response.venues[0].location;
      const { name } = response.data.response.venues[0];
      console.log('Foursquare worked!', response.data.response.venues[0]);
      return { distance, name };
    })
    .then(({ distance, name }) => {
      if (distance <= 10) {
      // User is close to coffee shop, send notification
        axios
          .post(
            'https://exp.host/--/api/v2/push/send',
            {
              to: pushToken,
              sound: 'default',
              title: 'Manifest',
              body: `Step away from ${name}. Don't spend your money ${purchase}`,
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
