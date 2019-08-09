import React from 'react';
import { AppLoading, Notifications } from 'expo';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, PushNotificationIOS } from 'react-native';
import * as Permissions from 'expo-permissions';
import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET } from '../app.config.json';

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
    };
    this.onToggleButton = this.onToggleButton.bind(this);
    this.setState = this.setState.bind(this);
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
      } else {
        throw new Error('Location permission not granted');
      }
    }

    //setInterval(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        console.log('position outside of permissions', position);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&ll=${this.state.latitude},${this.state.longitude}&intent=checkin&radius=60&categoryId=4bf58dd8d48988d1e0931735&v=20190425`)
          .then(result => {
            console.log('get location result from front:', result);
            return result.json();
          })
          .then(response => {
            console.log('response:', response);
            console.log('location distance:', response.response.venues[0].location.distance);
            let distance = response.response.venues[0].location.distance;
            this.setState({
              dangerDistance: response.response.venues[0].location.distance,
            })
          })
          .catch(err => {
            console.log('get location error from front:', err);
          })
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    //}, 20000);

    getLocationAsync();
    // WATCH CURRENT POSITION:
    this.setState({ isReady: true });

    // PUSH NOTIFICATION PERMISSIONS

    const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }

      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      console.log('token:', token);

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: {
            value: token,
          },
          user: {
            username: 'Rachel Brandsness',
          },
        }),
      });
    }

  registerForPushNotificationsAsync();

  sendPushNotification = () => {
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[-ksyynDb5CVJ4kRH_8eSUV]',
        sound: 'default',
        title: 'Manifest',
        body: 'Don\'t you even think about going inside that CC\'s...'
      })
    });
  };

    if(this.state.dangerDistance < 60) {
      console.log('dangerDistance:', this.state.dangerDistance);
      sendPushNotification();
    } else {
      console.log('did not fire:', this.state.dangerDistance);
    }
  }

 

  onToggleButton() {
    this.setState({
      buttonToggle: !this.state.buttonToggle,
    })
  }

  render() {
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
        {this.state.buttonToggle ? <Text style={styles.message}>I said don't click me!</Text> : null}
        <Content />
        <Footer style={styles.footerbar}>
          <FooterTab>
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

const styles = StyleSheet.create({
  container: {

    justifyContent: "center",
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
  }
});

export default HomeScreen;
