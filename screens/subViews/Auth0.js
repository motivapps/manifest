import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Button, Text, AsyncStorage } from 'react-native';

const Auth0 = ({ name, callback, type }) => {
  return type === 'login' ? (
    <View>
      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
        ) : (
        <Button title="Log in with Auth0" onPress={callback} />
      )}
    </View>
  ) : (
    <View>
      {name ? (
        <Text style={styles.title}>Welcome, You are now logged in as {name}!</Text>
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
