import React from 'react';
import { Text, View, Image } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { Button } from 'native-base';
import { connect } from 'react-redux';
// import { Button } from 'react-native-elements';
// import { styles, colorTheme } from '../../common/styles';

// import { sendToken } from '../../store/token';

class Link extends React.Component {
  state = {
    data: {},
    status: ''
  };
  static navigationOptions = {
    title: 'Manifest',
    headerStyle: { fontWeight: 'bold'},
    headerTitleStyle: { color: 'green'
    }
  };

  // render() {
  //   switch (this.state.status) {
  //     case 'CONNECTED':
  //       return this.renderDetails();
  //     default:
  //       return this.renderLogin();
  //   }
  // }

  render() {
    return (
      <View>
      <Text>This is where the Plaid Authenticator is...</Text>
        <PlaidAuthenticator
          onMessage={this.onMessage}
          publicKey="a35fead643ab95153802609fa5c0a2"
          env="sandbox"
          product="auth,transactions"
          clientName="Manifest"
        />
      </View>
    );
  }

  renderDetails() {
    this.props.sendToken(this.state.data.metadata.public_token);
    // send public_token to server:
    fetch('https://67d0989d.ngrok.io', {
      method: 'POST',
      body: JSON.stringify({
        public_token: this.state.data.metadata.public_token
      })
    })

  //   return (
  //     <View>
       
  //       <Text>NEXT STEP</Text>
  //       <View>
  //         <View style={{ padding: 10 }}>
  //           <Button
  //             raised
  //             textStyle={{ textAlign: 'center' }}
  //             title={`Set Up Your Budget`}
              
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  onMessage = data => {
    fetch('https://67d0989d.ngrok.io/get_access_token', {
      method: 'POST',
      body: JSON.stringify({
        public_token: data.metadata.public_token
      })
    // this.setState({
    //   data,
    //   status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
    // });
  };
 }

// const mapDispatch = dispatch => {
//   return {
//     // rename to same thing - shorthand
//     sendToken: token => dispatch(sendToken(token))
//   };
// };

// export default connect(
//   null,
//   mapDispatch
// )(Link);

export default Link;