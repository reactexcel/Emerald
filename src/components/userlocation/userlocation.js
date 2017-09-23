import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, AlertIOS, ActivityIndicator, Text } from 'react-native';
import style from './styles';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as action from '../../actions/useraddress';
import * as profileAction from '../../actions/updateProfile';
import MyServiesList from '../listmyservices/listmyservices';

class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      add: {},
      laoding: false,
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 100,
        longitudeDelta: 100,
      },
    };
  }
  searchadd() {
    const address = this.state.address;
    this.props.onsearchAddress(address);
  }
  uploadUserLocation() {
    const userId = this.props.signupID.data || this.props.loginID.data;
    this.props.onUserLocationUpadte(userId, this.state.initialRegion).then((val) => {
      if (this.props.events) {
        this.props.events.emit("location_updated", { location: this.state.address, geometry: this.state.initialRegion });
      }
      this.props.navigator.pop();
    });
  }
  clear() {
    const region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 100,
      longitudeDelta: 100,
    };
    this.setState({ address: '', add: {}, initialRegion: region });
  }
  componentWillReceiveProps(props) {
    if (props.location.data.data) {
      if (props.location.data.data.results[0] !== undefined) {
        const formattedAddress = props.location.data.data.results[0].formatted_address;
        const latitude = props.location.data.data.results[0].geometry.location.lat;
        const longitude = props.location.data.data.results[0].geometry.location.lng;
        const userlocation = {
          latitude,
          longitude,
          latitudeDelta: 0.50,
          longitudeDelta: 0.50,
        };
        this.setState({ add: userlocation, address: formattedAddress, initialRegion: userlocation });
      } else if (props.location.data.data.results === undefined) {
        AlertIOS.alert(
          'Wrong Address Input',
          'Try a correct address',
        );
      }
    }
  }
  render() {
    const address = Object.keys(this.state.add).length;
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.state.loading}
              style={{ height: 80 }}
              size="large"
            />
          </View> :
          <View style={style.OuterContainer}>
            <MapView.Animated
              showsCompass
              zoomEnabled
              pitchEnabled
              toolbarEnabled
              showsMyLocationButton
              region={this.state.initialRegion}
              ref={(ref) => { this.mapRef = ref; }}
              provider={this.props.provider}
              style={style.map}
              scrollEnabled
              showsMyLocationButton
            >
              {address >= 1 ? <MapView.Marker
                key={1}
                coordinate={this.state.add}
                title={this.state.address}
              /> : null}
            </MapView.Animated>
            <View style={style.textcontainer}>
              <TextInput
                autoFocus
                autoCapitalize="none"
                nablesReturnKeyAutomatically
                style={style.SecondInput}
                onChangeText={address => this.setState({ address })}
                returnKeyType="next"
                value={this.state.address}
                placeholderTextColor={'grey'}
                placeholder="Search Address Here...."
              />
              <TouchableOpacity style={{ margin: 5 }} onPress={() => { this.searchadd(); }}>
                <Icon name="search-plus" size={22} color="grey" />
              </TouchableOpacity>
            </View>
            {address >= 1 ? <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.clear()}
                style={[style.bubble, style.button]}
              >
                <Text>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.uploadUserLocation()}
                style={[style.bubble, style.button]}
              >
                <Text>Update Location</Text>
              </TouchableOpacity>
            </View> : null}
          </View>}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { location: state.location.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onsearchAddress: address => dispatch(action.getlocation(address)),
  onUserLocationUpadte: (id, address) => dispatch(profileAction.updatelocation(id, address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLocation);
