import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { NGROK } from '../../app.config.json';
import axios from 'axios';
// import { Button } from 'react-native-elements';
// import { styles, colorTheme } from '../../common/styles';
import { storeData, getData, storeMulti, getMulti } from '../helpers/asyncHelpers';
// import { sendToken } from '../../store/token';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      status: '',
      userToken: null,
    };
  }

  async componentWillMount() {
    try {
      const userToken = await getData('userToken');
      if (userToken !== null) {
        console.log(userToken);
        this.setState({ userToken });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async componentDidUpdate() {
    const { status } = this.state;
    if (status === 'CONNECTED') {
      const { userToken, data: { metadata: { public_token } } } = this.state;
      const { redirect } = this.props;
  
      await axios.post(`${NGROK}/get_access_token`, {
        public_token,
        userToken,
      });
      await axios.post(`${NGROK}/auth`, {
        userToken,
      });

      redirect();
      // navigation.navigate('App');
    }
  }

  onMessage = (data) => {
    console.log(data);
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase(),
    });
  };

  render() {
    return (
      <></>
    );
  }

  // renderDetails() {
  //   // this.props.sendToken(this.state.data.metadata.public_token);
  //   // send public_token to server:
  //   const { userToken, data: { metadata: { public_token } } } = this.state;
  //   axios.post(`${NGROK}/get_access_token`, {
  //     public_token,
  //     userToken,
  //   });
  //   axios.post(`${NGROK}/auth`, {
  //     userToken,
  //   });
  //   return (
  //     <View>
  //       <Text>NEXT STEP</Text>
  //       <View>
  //         <View style={{ padding: 10 }}>
  //           <Button raised textStyle={{ textAlign: 'center' }} title="Set Up Your Budget" />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  // render() {
  //   if (this.state.status === 'CONNECTED') {
  //     return this.renderDetails();
  //   }
  //   return this.renderLogin();
  // }
}
export default Link;
