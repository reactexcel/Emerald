import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import style from './style';
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import * as Action from '../../actions/updateProfile';
import * as getuserInfoAction from '../../actions/getuserprofile';


class ServicesPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hourlyrate: '',
    };
    this.addHourlyRate = this.addHourlyRate.bind(this);
  }
  componentWillMount() {
    this.props.onGetUserDetails(this.props.signupID.data || this.props.loginID.data).then((val) => {
      if (this.props.data.data.price !== undefined) {
        this.setState({ Hourlyrate: this.props.data.data.price });
      }
    });
  }
  addHourlyRate() {
    const id = this.props.signupID.data || this.props.loginID.data;
    const rate = this.state.Hourlyrate;
    this.props.onUserServicePriceUpdate(id, rate).then((val) => {
      this.props.navigator.pop({});
    });
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 35, marginTop: 10, marginLeft: 10, marginRight: 10, borderWidth: 1, borderRadius: 6, borderColor: 'black', padding: 8 }}
            value={this.state.Hourlyrate}
            placeholder="Add Hourly Rate"
            placeholderTextColor="grey"
            onChangeText={(text) => { this.setState({ Hourlyrate: text }); }}
          />
        </View>
        {this.state.Hourlyrate.length > 0 ? <View style={{ marginBottom: 8 }}>
          <Button
            raised
            small
            backgroundColor="#01395e"
            onPress={() => { this.addHourlyRate(); }}
            icon={{ name: 'check', type: 'font-awesome' }}
            title="UPDATE HOURLY RATE"
            borderRadius={20}
          />
        </View> : null}
        <KeyboardSpacer />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS(), data: state.getprofile.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onGetUserDetails: userId => dispatch(getuserInfoAction.getUserInfo(userId)),
  onUserServicePriceUpdate: (id, rate) => dispatch(Action.updateServicesPrice(id, rate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPrices);
