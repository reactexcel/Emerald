import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileComplete from '../profilecomplete/profilecomplete';
import * as loginAction from '../../actions/login';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as signoutAction from '../../actions/signup';
import { View, TextInput, ActivityIndicator, VibrationIOS, AlertIOS } from 'react-native';
import style from './style';
import { Error } from '../error/error';
import { Button } from 'react-native-elements';
import PolygonCreator from '../map/map';
import Application from '../drawer/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      errormsg: '',
      error: false,
      drawerIcon: '',
    };
    this.userLogin = this.userLogin.bind(this);
  }
  componentWillMount() {
    Icon.getImageSource('bars', 30, '#01395e').then(source => this.setState({ drawerIcon: source }));
  }
  userLogin() {
    const email = this.state.Email;
    const password = this.state.Password;
    if (email && password) {
      if (loginAction.validateEmail(email)) {
        this.props.onLogin(email, password).then((val) => {
          if (val.uid) {
            this.props.navigator.push({ component: Application,
              title: 'HitchPin',
              tintColor: '#01395e',
              leftButtonIcon: this.state.drawerIcon,
              onLeftButtonPress: () => { this.handleDrawer(); },
              // rightButtonTitle: 'Profile',
              // onRightButtonPress: () => this.props.navigator.push({ component: ProfileComplete,
              // }),
              // onLeftButtonPress: () => { this._signOut(); },
            });
          } else {
            this.setState({ errormsg: val });
            VibrationIOS.vibrate();
            this.setState({ Email: '', Password: '', error: true });
          }
        });
      } else {
        this.setState({ errormsg: 'EMAIL SHOULD BE IN CORRECT FORMAT', error: true });
        VibrationIOS.vibrate();
        this.setState({ Email: '', Password: '' });
      }
    } else {
      this.setState({ errormsg: 'ALL FIELDS ARE REQUIRED', error: true });
      VibrationIOS.vibrate();
    }
  }
  _signOut() {
    this.props.onSignout();
    this.props.navigator.popToTop({});
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  handleDrawer() {
    this.props.onDrawer();
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        {this.props.loader.isLoading ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.props.loader.isLoading}
              style={{ height: 80 }}
              size="large"
            />
          </View> :
          <View style={{ flex: 1 }}>
            <View style={style.InsideContainer}>
              <View style={[this.state.error ? style.errorborder : style.border]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon name="envelope-o" size={20} color="#fff" />
                  </View>
                  <TextInput
                    ref="1"
                    autoFocus
                    autoCapitalize="none"
                    nablesReturnKeyAutomatically
                    style={style.SecondInput}
                    onChangeText={Email => this.setState({ Email })}
                    returnKeyType="next"
                    keyboardType="email-address"
                    value={this.state.Email}
                    placeholderTextColor={this.state.error ? '#b22222' : 'grey'}
                    placeholder="Email"
                    onSubmitEditing={() => this.focusNextField('2')}
                  />
                </View>
              </View>
              <View style={[this.state.error ? style.errorborder : style.border]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon name="unlock-alt" size={22} color="#fff" />
                  </View>
                  <TextInput
                    ref="2"
                    autoCapitalize="none"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    secureTextEntry
                    placeholderTextColor={this.state.error ? '#b22222' : 'grey'}
                    onChangeText={Password => this.setState({ Password })}
                    returnKeyType="go"
                    value={this.state.Password}
                    placeholder="Password"
                  />
                </View>
              </View>
              <Error text={this.state.errormsg} />
            </View>
            <View style={style.Buttons}>
              {/* <Button
                onPress={() => { this.userLogin(); }}
                title="NEXT"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              /> */}
              <Button
                raised
                fontSize={18}
                title="SIGN IN"
                icon={{ name: 'sign-in', type: 'font-awesome' }}

                onPress={() => { this.userLogin(); }}
                backgroundColor="#01395e"
                borderRadius={5}
              />
            </View>
            <KeyboardSpacer />
          </View>}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onDrawer: () => dispatch(loginAction.openDrawer()),
  onLogin: (email, password) => dispatch(loginAction.login(email, password)),
  onSignout: () => dispatch(signoutAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
