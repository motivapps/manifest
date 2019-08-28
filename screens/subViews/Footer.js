/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Text,
  Button,
  Footer,
  FooterTab,
  Icon,
} from 'native-base';
import {
  StyleSheet, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 5,
  },
});

// { navStats, navGames, navGoals, openDrawer }
const footer = (context) => {
  const navStats = () => context.props.navigation.navigate('StatsStack');
  const navGames = () => context.props.navigation.navigate('GamesStack');
  const navGoals = () => context.props.navigation.navigate('GoalsStack');
  const { openDrawer } = context.props.navigation;
  const { footerbar, buttonText } = styles;

  return (
    <Footer style={footerbar}>
      <FooterTab style={{ backgroundColor: '#49d5b6' }}>
        <Button vertical>
          <TouchableOpacity onPress={navStats}>
            <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="md-stats" />
            <Text style={buttonText}>Stats</Text>
          </TouchableOpacity>
        </Button>
        <Button vertical>
          <TouchableOpacity onPress={navGames}>
            <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="logo-game-controller-a" />
            <Text style={buttonText}>Games</Text>
          </TouchableOpacity>
        </Button>
        <Button vertical>
          <TouchableOpacity onPress={navGoals}>
            <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="md-ribbon" />
            <Text style={buttonText}>Goals</Text>
          </TouchableOpacity>
        </Button>
        <Button vertical>
          <TouchableOpacity onPress={openDrawer}>
            <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="md-menu" />
            <Text style={buttonText}>Menu</Text>
          </TouchableOpacity>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default footer;
