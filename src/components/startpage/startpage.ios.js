import React, { Component } from 'react';
import { View, Image } from 'react-native';
import SignUp from '../signuppage/signuppage';
import Login from '../login/login';
import style from './styles';
import { Button } from 'react-native-elements';

export class StartPage extends Component {
  constructor(props) {
    super(props);
    this.getSignup = this.getSignup.bind(this);
  }
  getSignup() {
    this.props.navigator.push({ component: SignUp,
      title: 'Sign Up',
      tintColor: '#01395e',
      rightButtonTitle: 'Login',
      onRightButtonPress: () => this.props.navigator.push({ component: Login, title: 'Login', tintColor: '#01395e' }),
    });
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        <Image
          style={{ flex: 1, justifyContent: 'flex-end' }}
          source={{ uri: 'https://staticpost.s3.amazonaws.com/farm.jpg' }}
        >
          <Button
            raised
            fontSize={18}
            title="Get Started"
            onPress={() => {
              this.getSignup();
            }}
            backgroundColor="#01395e"
            borderRadius={5}
          />
          <View style={{ paddingBottom: 10 }} />
        </Image>
      </View>
    );
  }
}
