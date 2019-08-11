/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Icon, Content, Button, Text, Item, Input, Grid, Row, Col, Picker } from 'native-base';
import Link from './subViews/PlaidLink';

class GoalsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
    };
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (
       <Container style={styles.container}>
        <View style={styles.viewport}>
          <Text style={styles.heading}>My Goals</Text>

          <Grid style={{ width: '100%', marginTop: 10 }}>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}><Text style={styles.buttonText}>Current Goals</Text></Button>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 60 }}>
                <Button style={styles.transactionButton}><Text style={styles.buttonText}>Set New Goal</Text></Button></Col>
            </Row>
          </Grid>
          <Text style={styles.smallTextLeft}>Goal Name:</Text>
          <Item floatingLabel style={{marginBottom: 10, height: 36 }}>
            <Input placeholder="Ex. Clyde's New Kayak" />
          </Item>
          <Text style={styles.smallTextLeft}>What are you saving up to purchase?</Text>
          <Item floatingLabel style={{ marginBottom: 10, height: 36 }}>
            <Input placeholder="Ex. Fancy Pants Kayak" />
          </Item>
          <Text style={styles.smallTextLeft}>Amount Needed to reach goal:</Text>
          <Item floatingLabel style={{ marginBottom: 10, height: 36 }}>
            <Input placeholder="Ex. $495.00" />
          </Item>
          <Text style={styles.smallTextLeft}>Select vice you want to quit:</Text>
          <Item picker style={{ marginBottom: 10, height: 36 }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: '75%' }}
              placeholder="Ex. Coffee"
              placeholderStyle={{ color: "#4c4c4c" }}
              placeholderIconColor="#49d5b6"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)} >
              <Picker.Item label="Coffee" value="key0" />
              <Picker.Item label="Smoking" value="key1" />
              <Picker.Item label="Fast Food" value="key2" />
            </Picker>
          </Item>
          <Text style={styles.smallTextLeft}>Price per vice purchase:</Text>
          <Item floatingLabel style={{ marginBottom: 10, height: 36 }}>
            <Input placeholder="Ex. $5.95" />
          </Item>
          <Text style={styles.smallTextLeft}>Vice purchase frequency:</Text>
          <Item picker style={{ marginBottom: 10, height: 36 }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: '74%' }}
              placeholder="Ex. Daily"
              placeholderStyle={{ color: "#4c4c4c" }}
              placeholderIconColor="#49d5b6"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)} >
              <Picker.Item label="Daily" value="key0" />
              <Picker.Item label="Twice per Week" value="key1" />
              <Picker.Item label="Once per Week" value="key2" />
            </Picker>
          </Item>
          <Button style={styles.saveButton}><Text style={styles.buttonText}>Save Goal</Text></Button>
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
});

export default GoalsScreen;
