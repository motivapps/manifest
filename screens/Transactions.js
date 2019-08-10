/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';

export default class Transactions extends React.Component {


  render() {
    return (
      <Container style={this.styles.container}>
        <View style={this.styles.container}>
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Transactions</Text>
        </View>
        <Footer style={styles.footerbar}>
          <FooterTab>
            <Button vertical>
              <Icon style={{ fontSize: 30, color: '#fff' }} name="md-stats" />
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

