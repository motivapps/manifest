import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Button } from 'native-base';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      buttonToggle: false,
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
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=USVL34WDRM322JXRDHU4EQW1QREZGPXOMTZSNJKYQUIGKE5O&client_secret=2KGK1VOONWZ1T0OMNFKWXFHDOP0JYXPIVYXQ5KKUDXA55ZHQ&ll=${latitude},${longitude}&intent=checkin&radius=60&categoryId=4bf58dd8d48988d1e0931735&v=20190425`)
              .then(result => {
                console.log('get location result from front:', result);
                return result.json();
              })
              .then(response => {
                console.log('response:', response);
              })
              .catch(err => {
                console.log('get location error from front:', err);
              })
          },
          (err) => console.error(err),
          { timeout: 20000, maximumAge: 30000, enableHighAccuracy: true, distanceFilter: 20 }
        );
      } else {
        throw new Error('Location permission not granted');
      }
    }

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
        <Text style={styles.title}>Manifest</Text>
        <Text>It's alive!</Text>
        <Button danger onPress={this.onToggleButton}>
          <Text>Do Not Click Me!</Text>
        </Button>
        {this.state.buttonToggle ? <Text style={styles.message}>I said don't click me!</Text> : null}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: 'center',
    marginHorizontal: 50,
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
});


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
