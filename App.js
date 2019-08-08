import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
import { Platform, StatusBar, StyleSheet, View , TouchableOpacity, PushNotificationIOS } from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Link from './screens/PlaidLink';
import Login from './screens/Login';
<<<<<<< HEAD
// import PushNotification from 'react-native-push-notification';
=======
import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET } from './app.config.json';
>>>>>>> 54da1d3b8242d99c165aa60fe100b6a8be83bc22
// import Geolocation from 'react-native-geolocation-service';


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
    this.onCheckLocation = this.onCheckLocation.bind(this);
    this.setState = this.setState.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    
    // GET LOCATION PERMISSIONS:
    async function getLocationAsync() {
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        return navigator.geolocation.watchPosition(
          (position) => {
            console.log(position);
            let positionLatitude = position.coords.latitude;
            console.log(positionLatitude);
            // this.setState({
            //   latitude: position.coords.latitude,
            // })

            // Call Foursquare API for coffee shops within 60 meters of current location
            let latitude = position.coords.latitude;
            console.log('current latitude:', latitude);
            let longitude = position.coords.longitude;
            console.log('current longitude:', longitude);
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
          },
          (err) => console.error(err),
          { timeout: 2000, maximumAge: 2000, enableHighAccuracy: true, distanceFilter: 1 }
        );
      } else {
        throw new Error('Location permission not granted');
      }
<<<<<<< HEAD
    }

    // PushNotification.configure({

    //   onRegister: function (token) {
    //     //process token
    //   },

    //   onNotification: function (notification) {
    //     // process the notification
    //     // required on iOS only
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },

    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   },

    //   popInitialNotification: true,
    //   requestPermissions: true,

    // });

    //setInterval(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        console.log('position outside of permissions', position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        // fetch(`https://api.foursquare.com/v2/venues/search?client_id=USVL34WDRM322JXRDHU4EQW1QREZGPXOMTZSNJKYQUIGKE5O&client_secret=2KGK1VOONWZ1T0OMNFKWXFHDOP0JYXPIVYXQ5KKUDXA55ZHQ&ll=${this.state.latitude},${this.state.longitude}&intent=checkin&radius=60&categoryId=4bf58dd8d48988d1e0931735&v=20190425`)
        //       .then(result => {
        //         console.log('get location Foursquare result:', result);
        //         return result.json();
        //       })
        //       .then(response => {
        //         console.log('response:', response);
        //       })
        //       .catch(err => {
        //         console.log('get location error from front:', err);
        //       })
        // PushNotificationIOS.presentLocalNotification({alertBody: 'but does it work?'});
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    //}, 20000);
=======
    } 
    
  /**
   * uncomment for location info
   */
    // setInterval(() => {
    // navigator.geolocation.watchPosition(
    //   (position) => {
    //     console.log('position outside of permissions', position);
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     })
    //   },
    //   (err) => console.error(err),
    //   { timeout: 2000, maximumAge: 3000, enableHighAccuracy: true, distanceFilter: 10 }
    // );
    // }, 3000);
>>>>>>> 54da1d3b8242d99c165aa60fe100b6a8be83bc22

    getLocationAsync();
    // WATCH CURRENT POSITION:
    this.setState({ isReady: true });
    
  }

  onCheckLocation() {
    console.log('latitude:', this.state.latitude);
    let latitude = this.state.latitude;
    axios.get('/', {latitude})
    .then(result => {
      console.log('get location result from front:', result);
    })
    .catch(err => {
      console.log('get location error from front:', err);
    })
  }

  onToggleButton() {
    this.setState({
      buttonToggle: !this.state.buttonToggle,
    })
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
        {this.state.buttonToggle ? <Text style={styles.message}>I said don't click me!</Text> : null}
        <Content />
        <Footer style={styles.footerbar}>
          <FooterTab>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff'}} name="md-stats" />
              <Text style={styles.buttonText}>Stats</Text>
            </Button>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
              <Text style={styles.buttonText}>Games</Text>
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
    backgroundColor: '#34d1af',
    fontWeight: 'bold',
    color: '#fff',
  }
});


// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <TouchableOpacity onPress={this.props.navigation.openDrawer}>
//           <Text>Open Drawer</Text>
//         </TouchableOpacity>
//         <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Home</Text>
//       </View>
//     );
//   }
// }

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link />
        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Text>Open Menu</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Settings</Text>
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Login />
        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Text>Open Menu</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Login</Text>
      </View>
    );
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Plaid: SettingsScreen,
    Login: LoginScreen,
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#34d1af',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#34d1af',
    },
  }
);

export default createAppContainer(DrawerNavigator);



// import { AppLoading } from 'expo';
// import { Asset } from 'expo-asset';
// import * as Font from 'expo-font';
// import React, { useState } from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import AppNavigator from './navigation/AppNavigator';

// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//         <AppNavigator />
//       </View>
//     );
//   }
// }

// async function loadResourcesAsync() {
//   await Promise.all([
//     Asset.loadAsync([
//       require('./assets/images/robot-dev.png'),
//       require('./assets/images/robot-prod.png'),
//     ]),
//     Font.loadAsync({
//       // This is the font that we are using for our tab bar
//       ...Ionicons.font,
//       // We include SpaceMono because we use it in HomeScreen.js. Feel free to
//       // remove this if you are not using it in your app
//       'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//     }),
//   ]);
// }

// function handleLoadingError(error) {
//   // In this case, you might want to report the error to your error reporting
//   // service, for example Sentry
//   console.warn(error);
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
