/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Footer,
  FooterTab,
  Icon,
  Content,
  Button,
  Text,
  Item,
  Input,
  Grid,
  Row,
  Col,
  Thumbnail,
} from 'native-base';

import axios from 'axios';
import { NGROK } from '../app.config.json';

class MyAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: null,
      name: null,
    };
  }

  async componentWillMount() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        console.log(userToken);
        this.setState({ userToken });
        axios.get(`${NGROK}/user/${userToken}`)
          .then((response) => {
            console.log('userId from front :', response.data);
            this.setState({ 
              profilePic: response.data.picture,
              name: response.data.name 
            });
          })
          .catch((err) => {
            console.log('userId get error:', err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, profilePic } = this.state;

    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
        <ScrollView>
          <Text style={styles.heading}>My Account</Text>

          <Grid style={{ width: 260, marginTop: 20 }}>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Thumbnail
                    square
                    style={styles.profileImg}
                    source={{uri: profilePic}}
                  />
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Text style={styles.largeTextGray}>{name ? name : 'No user found'}</Text>
              </Col>
            </Row>
            <Row>
              <Button style={styles.transactionButton} onPress={() => navigate('AccountAssign')}><Text style={styles.buttonText}>Connect Bank</Text></Button>
            </Row>
            <Row style={{ width: '100%', marginBottom: 10 }}>
              <Text style={styles.smallTextLeft}>Connect your bank account to be able to track your spending on vices and transfer money saved by staying on track to your savings account.</Text>
            </Row>
            <Row>
                <Button style={styles.transactionButton}><Text style={styles.buttonText}>Delete Account</Text></Button>
            </Row>
            <Row style={{ width: '100%', marginBottom: 10 }}>
              <Text style={styles.smallTextLeft}>Deleting your account will permanently delete all data and goals associated with your account.</Text>
            </Row>

          </Grid>
          </ScrollView>
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
    marginLeft: 10,
    marginRight: 10,
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
    textAlign: 'center',
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  largeTextGray: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 30,
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
    marginTop: 20,
    marginBottom: 10,
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
  profileImg: {
    width: 120,
    height: 120,
    marginRight: 5,
    marginBottom: 100,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#49d5b6',
  },
});

export default MyAccountScreen;
