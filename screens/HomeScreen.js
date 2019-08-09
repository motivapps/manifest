import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, PushNotificationIOS } from 'react-native';
import * as Permissions from 'expo-permissions';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      buttonToggle: false,
      isAuthenticated: false,
      latitude: null,
      longitude: null,
      
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
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
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
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    //}, 20000);

    getLocationAsync();
    // WATCH CURRENT POSITION:
    this.setState({ isReady: true });

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
