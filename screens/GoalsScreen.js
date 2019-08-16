/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Container, Footer, FooterTab, Icon, Content, Button, Grid, Row, Col,
} from 'native-base';
import axios from 'axios';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Link from './subViews/PlaidLink';
import { NGROK, UNSPLASH_CLIENT_ID } from '../app.config.json';

class GoalsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalName: '',
      goalItem: '',
      goalAmount: '',
      vicePrice: '',
      viceFrequency: '',
      viceName: '',
      userToken: null,
      userId: null,
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
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
            this.setState({ userId: response.data.id });
          })
          .catch((err) => {
            console.log('userId get error:', err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  onHandleSubmit() {
    const {
      goalName, goalItem, goalAmount, vicePrice, viceFrequency, viceName, userId,
    } = this.state;
    console.log('goalName:', goalName);
    console.log('goalItem:', goalItem);
    console.log('goalAmount:', goalAmount);
    console.log('vicePrice:', vicePrice);
    console.log('viceFrequency:', viceFrequency);
    console.log('viceName:', viceName);
    console.log('userId:', userId);

    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${goalItem}
&client_id=${UNSPLASH_CLIENT_ID}`)
      .then((response) => {
        console.log('unsplash response:', response.data.results[0].urls.thumb);
        return axios.post(`${NGROK}/user/goals`, {
          goalName, goalItem, goalAmount, vicePrice, viceFrequency, viceName, userId, goalPhoto: response.data.results[0].urls.thumb,
        });
      })
      .then((response) => {
        console.log('goals post from front response:', response);
      })
      .catch((err) => {
        console.log('goals error:', err);
      });
  }

  render() {
    const {
      goalName, goalItem, goalAmount, vicePrice, viceFrequency, viceName,
    } = this.state;

    const placeholderVices = {
      label: 'Select a vice...',
      value: null,
      color: '#9EA0A4',
    };

    const vices = [
      {
        label: 'Coffee',
        value: 'Coffee',
      },
      {
        label: 'Smoking',
        value: 'Smoking',
      },
      {
        label: 'Fast Food',
        value: 'Fast Food',
      },
    ];

    const placeholderFrequency = {
      label: 'Ex. Daily',
      value: null,
      color: '#9EA0A4',
    };

    const frequencies = [
      {
        label: 'Daily',
        value: 'Daily',
      },
      {
        label: 'Twice Per Week',
        value: 'Twice Per Week',
      },
      {
        label: 'Once Per Week',
        value: 'Once Per Week',
      },
    ];

    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <ScrollView>
            <Text style={styles.heading}>My Goals</Text>

            <Grid style={{ width: '100%', marginTop: 10 }}>
              <Row style={{ width: '100%' }}>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButtonDark}>
                    <Text style={styles.buttonText}>Set New Goal</Text>
                  </Button>
                </Col>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButton}>
                    <Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('GoalsSummary')}>Current Goals</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>

            <Text style={styles.smallTextLeft}>Goal Name:</Text>
            <TextInput
              style={{
                height: 36,
                borderColor: '#cccccc',
                borderWidth: 1,
                width: 300,
                borderRadius: 8,
              }}
              onChangeText={(text) => {
                this.setState({ goalName: text });
              }}
              value={goalName}
            />

            <Text style={styles.smallTextLeft}>What are you saving up to purchase?</Text>
            <TextInput
              style={{
                height: 36,
                borderColor: '#cccccc',
                borderWidth: 1,
                width: 300,
                borderRadius: 8,
              }}
              onChangeText={(text) => {
                this.setState({ goalItem: text });
              }}
              value={goalItem}
            />

            <Text style={styles.smallTextLeft}>Amount Needed to reach goal:</Text>
            <TextInput
              style={{
                height: 36,
                borderColor: '#cccccc',
                borderWidth: 1,
                width: 300,
                borderRadius: 8,
              }}
              onChangeText={(text) => {
                if (text[0] === '$') {
                  this.setState({ goalAmount: text.slice(1, text.length) });
                } else {
                  this.setState({ goalAmount: text });
                }
              }}
              value={goalAmount}
            />

            <Text style={styles.smallTextLeft}>Select vice you want to quit:</Text>

            <RNPickerSelect
              placeholder={placeholderVices}
              items={vices}
              onValueChange={(value) => {
                this.setState({
                  viceName: value,
                });
              }}
              style={pickerSelectStyles}
              value={viceName}
            />

            <Text style={styles.smallTextLeft}>Price per vice purchase:</Text>
            <TextInput
              style={{
                height: 36,
                borderColor: '#cccccc',
                borderWidth: 1,
                width: 300,
                borderRadius: 8,
              }}
              onChangeText={(text) => {
                if (text[0] === '$') {
                  this.setState({ vicePrice: text.slice(1, text.length) });
                } else {
                  this.setState({ vicePrice: text });
                }
              }}
              value={vicePrice}
            />

            <Text style={styles.smallTextLeft}>Vice purchase frequency:</Text>
            <RNPickerSelect
              placeholder={placeholderFrequency}
              items={frequencies}
              onValueChange={(value) => {
                this.setState({
                  viceFrequency: value,
                });
              }}
              style={pickerSelectStyles}
              value={viceFrequency}
            />

            <Button style={styles.saveButton}>
              <Text style={styles.buttonText} onPress={this.onHandleSubmit}>
                Save Goal
              </Text>
            </Button>
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
    textAlign: 'center',
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
  },
  smallTextLeft: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    marginTop: 10,
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
  transactionButtonDark: {
    backgroundColor: '#218771',
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
    marginTop: 10,
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    height: 36,
    width: 300,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default GoalsScreen;
