/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
import * as Permissions from 'expo-permissions';
import AppContainer from './navigation/AppNavigator.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isAuthenticated: false,
      latitude: null,
      longitude: null,
      auth0_id: null,
      picture: null,
      name: null,
    };
  }

  async componentDidMount() {
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
        console.log('position outside of permissions', position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // fetch(`https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&ll=${latitude},${longitude}&intent=checkin&radius=60&categoryId=4bf58dd8d48988d1e0931735&v=20190425`)
        //   .then(result => {
        //     console.log('get location result from front:', result);
        //     return result.json();
        //   })
        //   .then(response => {
        //     console.log('response:', response);
        //   })
        //   .catch(err => {
        //     console.log('get location error from front:', err);
        //   })
        // PushNotificationIOS.presentLocalNotification({alertBody: 'but does it work?'});
      },
      err => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    // }, 20000);

    getLocationAsync();
    // WATCH CURRENT POSITION:
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
