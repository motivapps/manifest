/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
 StyleSheet, View, Alert, TouchableOpacity, AsyncStorage 
} from 'react-native';
import {
 Container, Footer, FooterTab, Icon, Content, Button, Text 
} from 'native-base';
import {
 storeData, getData, storeMulti, getMulti 
} from './helpers/asyncHelpers';
import Link from './subViews/PlaidLink';

class PlaidScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth0_id: '',
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    const { navigation } = this.props;
    navigation.navigate('Home');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Link redirect={this.redirect} />
        <Content />
        <Footer style={styles.footerbar}>
          <FooterTab style={{ backgroundColor: '#49d5b6' }}>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
                <Text style={styles.buttonText}>Stats</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Games')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="logo-game-controller-a" />
                <Text style={styles.buttonText}>Games</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Goals')}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-ribbon" />
                <Text style={styles.buttonText}>Goals</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Icon style={{ fontSize: 30, color: '#fff' }} name="md-menu" />
                <Text style={styles.buttonText}>Menu</Text>
              </TouchableOpacity>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
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
  },
});

export default PlaidScreen;
