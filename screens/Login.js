import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Button, Text } from 'react-native';

const Login = (props) => {
    const { name, login } = props;
    return (
        <View>
            {name ?
            <Text style={styles.title}>You are logged in, {name}!</Text> :
            <Button title='Log in with Auth0' onPress={login} />
            }
        </View>
    )
}

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

export default Login;