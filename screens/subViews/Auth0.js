import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Button, Text, AsyncStorage } from 'react-native';
import HomeScreen from '../HomeScreen';

const Auth0 = ({ name, userToken, callback, type, goToApp }) => {
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@userToken', userToken);
      return goToApp();
    } catch (error) {
      // Error saving data
    }
  };

  return type === 'login' ? (
    <View>
      {name ? (
        // <Text style={styles.title}>You are logged in, {name}!</Text>
        storeData()
        ) : (
        <Button title="Log in with Auth0" onPress={callback} />
      )}
    </View>
  ) : (
    <View>
      {name ? (
        // <Text style={styles.title}>Welcome, You are now logged in as {name}!</Text>
        storeData()
      ) : (
        <Button title="Sign up with Auth0" onPress={callback} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default Auth0;
