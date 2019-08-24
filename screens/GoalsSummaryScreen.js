import React from 'react';
import { AppLoading } from 'expo';
import {
  Container,
  Text,
  Button,
  Footer,
  FooterTab,
  Icon,
  Grid,
  Row,
  Col,
} from 'native-base';
import axios from 'axios';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import * as Progress from 'react-native-progress';
import {
  NGROK,
  UNSPLASH_CLIENT_ID,
} from '../app.config.json';
import {
  storeData,
  getData,
  storeMulti,
  getMulti,
} from './helpers/asyncHelpers';
import PropTypes from 'prop-types';

class GoalsSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      primaryGoal: null,
      completionDate: null,
      modalVisible: false,
      auth0_id: null,
      goalName: '',
      goalItem: '',
      goalAmount: '',
      vicePrice: '',
      viceFrequency: '',
      viceName: '',
    };
    this.setState = this.setState.bind(this);
  }

  async componentWillMount() {
    const auth0_id = await getData('userToken');

    axios.get(`${NGROK}/goals/${auth0_id}`).then((response) => {
      this.setState({
        auth0_id,
        primaryGoal: response.data[0],
      });

      const daysLeft = (response.data[0].goal_cost - response.data[0].amount_saved) / response.data[0].vice_price;
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + daysLeft);

      const dd = targetDate.getDate();
      const mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
      const yyyy = targetDate.getFullYear();

      const dateString = `${mm}/${dd}/${yyyy}`;
      this.setState({ completionDate: dateString });

      if (response.data[0]) {
        storeData('primaryGoal', JSON.stringify(response.data[0]));
      }
      this.setState({ isReady: true });
    }).catch(error => console.log(error));
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      goalName,
      goalItem,
      goalAmount,
      vicePrice,
      viceFrequency,
      viceName,
      auth0_id,
    } = this.state;
    const {
      primaryGoal,
      isReady,
      completionDate,
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

    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <ScrollView>
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text style={styles.smallTextLeft}>Goal Name:</Text>
                <TextInput
                  style={{
                    height: 36,
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    width: 300,
                    borderRadius: 8,
                  }}
                  placeholder={primaryGoal.goal_name}
                  onChangeText={(text) => {
                    this.setState({ goalName: text || primaryGoal.goal_name });
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
                  placeholder={primaryGoal.goal_item}
                  onChangeText={(text) => {
                    this.setState({ goalItem: text || primaryGoal.goal_item });
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
                  defaultValue={primaryGoal.goal_cost.toString()}
                  placeholder={primaryGoal.goal_cost.toString()}
                  onChangeText={(text) => {
                    if (text[0] === '$') {
                      this.setState({ goalAmount: text.slice(1, text.length) });
                    } else {
                      this.setState({ goalAmount: text || primaryGoal.goal_cost.toString() });
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
                      viceName: value || primaryGoal.vice,
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
                  placeholder={primaryGoal.vice_price.toString()}
                  onChangeText={(text) => {
                    if (text[0] === '$') {
                      this.setState({ vicePrice: text.slice(1, text.length) });
                    } else {
                      this.setState({ vicePrice: text || primaryGoal.vice_price.toString() });
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
                      viceFrequency: value || primaryGoal.vice_freq,
                    });
                  }}
                  style={pickerSelectStyles}
                  value={viceFrequency}
                />
                <Button
                  style={styles.modalButton}
                  onPress={() => {
                    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${goalItem || primaryGoal.goal_item}
                    &client_id=${UNSPLASH_CLIENT_ID}`)
                      .then((response) => {
                        const goalPhoto = response.data.results[0].urls.thumb;
                        return goalPhoto;
                      })
                      .then((goalPhoto) => {
                        axios.patch(`${NGROK}/goals/${auth0_id}`, {
                          goal_cost: goalAmount || primaryGoal.goal_cost,
                          goal_name: goalName || primaryGoal.goal_name,
                          goal_item: goalItem || primaryGoal.goal_item,
                          goal_photo: goalPhoto,
                          vice: viceName || primaryGoal.vice,
                          vice_price: vicePrice || primaryGoal.vice_price,
                          vice_freq: viceFrequency || primaryGoal.vice_freq,
                        })
                          .then(() => {
                            axios.get(`${NGROK}/goals/${auth0_id}`).then((response) => {
                              this.setState({
                                primaryGoal: response.data[0],
                              });
                              storeData('primaryGoal', JSON.stringify(response.data[0]));
                            });
                          })
                      })
                      .catch(err => console.error(err));
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Button>
                <Button
                  style={styles.modalButton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
        
            <Text style={styles.heading}>My Goals</Text>

            <Grid style={{ width: '100%', marginTop: 10 }}>
              <Row style={{ width: '100%' }}>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButton} onPress={() => this.props.navigation.navigate('Goals')}>
                    <Text style={styles.buttonText}>Set New Goal</Text>
                  </Button>
                </Col>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button style={styles.transactionButtonDark}>
                    <Text style={styles.buttonText}>Current Goals</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>

            <Text style={styles.heading}>
Goal:
              {' '}
              {primaryGoal ? primaryGoal.goal_name : 'No goal set'}
              {' '}
            </Text>
            <Text style={styles.headingGray}>
Category:
              {' '}
              {primaryGoal ? primaryGoal.vice : 'No vice selected'}
            </Text>

            <Progress.Circle
             
              progress={primaryGoal ? primaryGoal.amount_saved / primaryGoal.goal_cost : 0}
              color="#49d5b6"
              unfilledColor="#cccccc"
              size={250}
              showsText={true}
              style={{ alignSelf: 'center', margin: 10 }}
              textStyle={{ fontWeight: 'bold' }}
              thickness={8}
            />

            <Image style={styles.mainImage} source={{ uri: primaryGoal ? primaryGoal.goal_photo : 'http://cdn.shopify.com/s/files/1/0682/0839/products/Vibe-Yellowfin-100-Kayak-Caribbean_Journey_grande.jpg?v=1555360419' }} />


            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={styles.smallText}>
Projected Completion Date:
                {' '}
                {completionDate || 'Loading...'}
              </Text>
              <Text style={styles.smallTextLeft}>
Daily Savings: $
                {primaryGoal ? primaryGoal.daily_savings.toFixed(2) : 0}
              </Text>
            </View>
            <View style={{ marginBottom: 10, marginLeft: 0 }}>
              <Text style={styles.largeText}>
Goal Amount: $
                {primaryGoal ? primaryGoal.goal_cost : 0}
              </Text>
              <Text style={styles.largeText}>
Money Saved: $
                {primaryGoal ? primaryGoal.amount_saved : 0}
              </Text>
            </View>

            <Grid style={{ width: '100%', marginTop: 10 }}>
              <Row style={{ width: '100%' }}>
                <Col style={{ backgroundColor: '#fff', height: 60 }}>
                  <Button
                    style={styles.transactionButton}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  >
                    <Text style={styles.buttonText}>Edit Goal</Text>
                  </Button>
                </Col>
                
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
  headingGray: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#4c4c4c',
    marginBottom: 4,
    marginTop: 6,
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
    marginTop: 6,
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
  modalButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
    margin: 10,
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
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
  },
  mainImage: {
    width: 250,
    height: 250,
    backgroundColor: '#49d5b6',
    margin: 10,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: '#49d5b6',
    alignSelf: 'center',
    marginTop: -260,
    zIndex: -100,
    opacity: 0.15,
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

export default GoalsSummaryScreen;
