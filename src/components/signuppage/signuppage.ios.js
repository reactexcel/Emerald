import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ActivityIndicator, VibrationIOS, AlertIOS, PushNotificationIOS } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ProfileComplete from '../profilecomplete/profilecomplete';
import style from './styles';
import * as loginAction from '../../actions/signup';
import Joblistpage from '../joblistpage/joblistpage';
import UserProfile from '../userprofile/userprofile';
import { Error } from '../error/error';
import { Button, CheckBox } from 'react-native-elements';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import PolygonCreator from '../map/map';
import * as Action from '../../actions/login';
import Application from '../drawer/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      error: false,
      checked: false,
      errormsg: '',
      token: '',
      drawerIcon: '',
    };
    this.userSignup = this.userSignup.bind(this);
  }
  componentWillMount() {
    FCM.requestPermissions();
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      if (notif.local_notification) {
        //this is a local notification
      }
      if (notif.opened_from_tray) {
        //app is open/resumed because user clicked banner
      }
      await someAsyncCall();

      if (Platform.OS === 'ios') {
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
            break;
        }
      }
    });
    Icon.getImageSource('bars', 30, 'grey').then(source => this.setState({ drawerIcon: source }));
  }

  userSignup() {
    const fname = this.state.FirstName;
    const lname = this.state.LastName;
    const email = this.state.Email;
    const password = this.state.Password;
    const token = this.state.token;
    const checkBox = this.state.checked;
    if (fname && lname && email && password && token && checkBox === true) {
      if (loginAction.validateEmail(email)) {
        this.props.onSignup(fname, lname, email, password, token).then((val) => {
          if (val.uid) {
            this.props.navigator.push({
              component: Application,
              title: 'HitchPin',
              tintColor: '#01395e',
              leftButtonIcon: this.state.drawerIcon,
              onLeftButtonPress: () => { this.handleDrawer(); },
            });
          } else {
            this.setState({ errormsg: val, error: true });
            VibrationIOS.vibrate();
            this.setState({ FirstName: '', LastName: '', Email: '', Password: '' });
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
    this.props.navigator.popToTop({});
    this.props.onSignout();
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  handleDrawer() {
    this.props.onDrawer();
  }
  handleCheckbox() {
    if (this.state.checked === true) {
      this.setState({ checked: false });
    } else if (this.state.checked === false) {
      this.setState({ checked: true });
    }
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
              <View style={[this.state.error ? style.errorInput : style.InputContainer]}>
                <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                  <Icon name="user" size={20} color="#fff" />
                </View>
                <TextInput
                  ref="1"
                  autoFocus
                  enablesReturnKeyAutomatically
                  style={style.TextInput}
                  onChangeText={FirstName => this.setState({ FirstName })}
                  returnKeyType="next"
                  placeholderTextColor={this.state.error ? '#b22222' : 'grey'}
                  value={this.state.FirstName}
                  placeholder="FirstName"
                  onSubmitEditing={() => this.focusNextField('2')}
                />
                <TextInput
                  ref="2"
                  enablesReturnKeyAutomatically
                  style={style.TextInput}
                  onChangeText={LastName => this.setState({ LastName })}
                  returnKeyType="next"
                  value={this.state.LastName}
                  placeholder="LastName"
                  placeholderTextColor={this.state.error ? '#b22222' : 'grey'}
                  onSubmitEditing={() => this.focusNextField('3')}
                />
              </View>
              <View style={[this.state.error ? style.errorborder : style.border]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon name="envelope-o" size={20} color="#fff" />
                  </View>
                  <TextInput
                    ref="3"
                    autoCapitalize="none"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    onChangeText={Email => this.setState({ Email })}
                    returnKeyType="next"
                    keyboardType="email-address"
                    value={this.state.Email}
                    placeholder="Email"
                    placeholderTextColor={this.state.error ? '#b22222' : 'grey'}
                    onSubmitEditing={() => this.focusNextField('4')}
                  />
                </View>
              </View>
              <View style={[this.state.error ? style.errorborder : style.border]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon name="unlock-alt" size={22} color="#fff" />
                  </View>
                  <TextInput
                    ref="4"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    secureTextEntry
                    onChangeText={Password => this.setState({ Password })}
                    returnKeyType="go"
                    placeholderTextColor={this.state.error ? '#b22222' : 'grey'}
                    value={this.state.Password}
                    placeholder="Password"
                  />
                </View>
              </View>
              <Error text={this.state.errormsg} />
              <CheckBox
                center
                title="I agree with App Terms & Policies"

                checkedIcon="check-square-o"
                checkedColor="#01395e"
                uncheckedIcon="square-o"
                uncheckedColor={this.state.error ? 'red' : 'grey'}
                onPress={() => { this.handleCheckbox(); }}
                checked={this.state.checked}
              />
            </View>
            <View style={style.button}>
              <Button
                raised
                fontSize={18}
                icon={{ name: 'user-plus', type: 'font-awesome' }}
                title="SIGN UP"
                onPress={() => { this.userSignup(); }}
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
  onDrawer: () => dispatch(Action.openDrawer()),
  onSignup: (fname, lname, email, password, token) => dispatch(loginAction.signup(fname, lname, email, password, token)),
  onSignout: () => dispatch(loginAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
