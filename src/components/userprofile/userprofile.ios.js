import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, AlertIOS, VibrationIOS, ActivityIndicator, Dimensions, Text, TouchableOpacity } from 'react-native';
import style from './style';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as updateProfileAction from '../../actions/updateProfile';
import * as getuserInfoAction from '../../actions/getuserprofile';
import * as postAction from '../../actions/getjoblist';
import MapPage from '../map/map';
import MyLocationMapMarker from '../map/map';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      location: '',
      skill: '',
      price: '',
      address: '',
      token: '',
    };
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentWillMount(props) {
    this.props.onGetUserDetails(this.props.signupID.data || this.props.loginID.data);
    FCM.getFCMToken().then((token) => {
      this.setState({ token });
    });
  }
  componentWillReceiveProps(props) {
    this.setState({
      FirstName: props.userprofile.data.firstname,
      LastName: props.userprofile.data.lastname,
      PhoneNumber: props.userprofile.data.phonenumber,
      location: props.userprofile.data.location,
      skill: props.userprofile.data.skill,
      price: props.userprofile.data.price,
    });
  }
  updateProfile() {
    const userId = this.props.signupID.data || this.props.loginID.data;
    const fname = this.state.FirstName;
    const lname = this.state.LastName;
    const phonenum = this.state.PhoneNumber;
    const location = this.state.location;
    const skill = this.state.skill;
    const price = this.state.price;
    // const address = this.props.profileupdate.location;
    const token = this.state.token;
    if (userId && fname && lname && phonenum && location && token) {
      this.props.onUpdateUserProfile(userId, fname, lname, phonenum, location, token).then((val) => {
        this.props.onGetUserDetails(userId).then(() => {
          this.props.navigator.pop({});
        });
      });
    } else {
      AlertIOS.alert('Make sure to mark your location on the map');
      VibrationIOS.vibrate();
    }
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  render() {
    const { height } = Dimensions.get('window');
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
              <View style={style.InputContainer}>
                <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                  <Icon name="user" size={20} color="#fff" />
                </View>
                <TextInput
                  ref="1"
                  enablesReturnKeyAutomatically
                  style={style.TextInput}
                  returnKeyType="next"
                  onChangeText={FirstName => this.setState({ FirstName })}
                  value={this.state.FirstName}
                  placeholder="First Name"
                  onSubmitEditing={() => this.focusNextField('2')}
                />
                <TextInput
                  ref="2"
                  enablesReturnKeyAutomatically
                  style={style.TextInput}
                  onChangeText={LastName => this.setState({ LastName })}
                  value={this.state.LastName}
                  placeholder="Last Name"
                  returnKeyType="next"
                  onSubmitEditing={() => this.focusNextField('3')}
                />
              </View>
              <View style={style.border}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon name="phone-square" size={20} color="#fff" />
                  </View>
                  <TextInput
                    ref="3"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    onChangeText={PhoneNumber => this.setState({ PhoneNumber })}
                    value={this.state.PhoneNumber}
                    keyboardType="numeric"
                    placeholder="Phone Number"
                    returnKeyType="next"
                    onSubmitEditing={() => this.focusNextField('4')}
                  />
                </View>
              </View>
              <View style={style.border}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 40, backgroundColor: '#01395e', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon name="address-card" size={20} color="#fff" />
                  </View>
                  <TextInput
                    ref="4"
                    enablesReturnKeyAutomatically
                    style={style.SecondInput}
                    returnKeyType="next"
                    onChangeText={location => this.setState({ location })}
                    value={this.state.location}
                    placeholder="Address"
                  />
                </View>
              </View>
              {/* <View style={style.border}>
                <TextInput
                  ref="5"
                  enablesReturnKeyAutomatically
                  style={style.SecondInput}
                  returnKeyType="next"
                  onChangeText={skill => this.setState({ skill })}
                  value={this.state.skill}
                  placeholder="Skill/Service"
                  onSubmitEditing={() => this.focusNextField('6')}
                />
              </View> */}
              {/* <View style={style.border}>
                <TextInput
                  ref="6"
                  enablesReturnKeyAutomatically
                  style={style.SecondInput}
                  returnKeyType="next"
                  onChangeText={price => this.setState({ price })}
                  value={this.state.price}
                  placeholder="Hourly Rate"
                />
              </View> */}
            </View>
            <View style={style.Buttons}>
              <Button
                raised
                title="UPDATE PROFILE"
                onPress={() => { this.updateProfile(); }}
                backgroundColor="#01395e"
                icon={{ name: 'check', type: 'font-awesome' }}
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
  return { signupID: state.signup.toJS(), loginID: state.login.toJS(), userprofile: state.getprofile.toJS(), profileupdate: state.profileUpdate.toJS(), loader: state.loader.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onUpdateUserProfile: (userId, fname, lname, phonenum, location, token) => dispatch(updateProfileAction.userInfoUpdate(userId, fname, lname, phonenum, location, token)),
  onGetUserDetails: userId => dispatch(getuserInfoAction.getUserInfo(userId)),
  ongetJobList: () => dispatch(postAction.getjobList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
