/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Icon, Content, Button, Text, Item, Input, Grid, Row, Col } from 'native-base';

import DonkeyKong from 'react-native-donkey-kong';

// export default class Games extends Component<{}> {
//   render() {
//     return <DonkeyKong />;
//   }
// }

class GamesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <Text style={styles.heading}>My Games</Text>

          <Grid style={{ width: 260, marginTop: 20 }}>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}></Container>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}></Container></Col>
            </Row>
            <Row style={{ width: '100%', marginBottom: 10 }}><Text style={styles.smallText}>Stick with your goals to unlock more games</Text></Row>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}></Container>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}></Container></Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}></Container>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}></Container></Col>
            </Row>
          </Grid>
          
        </View>
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
  viewport: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#49d5b6',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#49d5b6',
    marginTop: 10,
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    textAlign: 'center',
  },
  smallTextLeft: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  smallTextGreenLeft: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  basicButton: {
    backgroundColor: '#49d5b6',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  transactionButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
  },
  saveButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
    marginBottom: 10,
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
  mainImage: {
    width: 200,
    height: 200,
    backgroundColor: '#49d5b6',
    margin: 10,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#49d5b6',
  },
  gameContainer: {
    backgroundColor: '#49d5b6',
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default GamesScreen;
