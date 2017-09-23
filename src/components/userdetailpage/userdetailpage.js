import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, AlertIOS } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import style from './styles';
import ResponsiveImage from 'react-native-responsive-image';
import * as getuserInfoAction from '../../actions/getuserprofile';
import StarRating from '../star/starrating';
import ReviewSection from '../review/review';
import * as action from '../../actions/pushnotification';
import * as actionHire from '../../actions/hireuser';
import { connect } from 'react-redux';
import CustomCallout from './CustomCallout';
import PolygonCreator from '../map/map';
import LandSelect from '../landselect/landselect';

class UserDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      test: true,
    };
    this.sendNotificationWithData = this.sendNotificationWithData.bind(this);
  }
  sendNotificationWithData(hire, hiring) {
    if (hiring.data.price == undefined) {
      AlertIOS.alert(
        'COMPLETE YOUR BASIC PROFILE ',
        'PlOT LAND FOR HIRING',
      );
    } else {
      this.props.navigator.push({ component: LandSelect,
        title: 'Land',
        tintColor: '#01395e',
        passProps: { userProfile: this.props.userProfile },
      });
    }
  }
  componentWillMount() {
    this.props.onGetUserDetails(this.props.signupID.data || this.props.loginID.data);
  }
  mapPressed(event) {
    console.log(event.nativeEvent);
  }
  render() {
    const { width, height } = Dimensions.get('window');
    const test = 'https://www.landequity.com/admin/uploads/7964334land.jpg';
    const img = this.props.userProfile.image === undefined ? test : this.props.userProfile.image[0].uri;
    return (
      <View style={style.OuterContainer}>
        <ScrollView>
          <View
            style={{
            }}
          >
            <ResponsiveImage source={{ uri: img }} initWidth={width + 50} initHeight="245" />
          </View>
          <View
            style={{
              margin: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                color: '#3e3a3a',
                fontWeight: 'bold',
              }}
            >
              {this.props.userProfile.skill}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 20,
                marginBottom: 20,
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  marginTop: 6,
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,

                  }}
                >
                Job Posted By
              </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'green',
                  }}
                >
                  {this.props.userProfile.firstname} {this.props.userProfile.lastname}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 30,
                  }}
                >
                  {this.props.userProfile.location}
                </Text>
              </View>
              <Avatar
                large
                style={{
                  marginBottom: 10,
                  marginRight: 75,
                }}
                rounded
                source={{ uri: 'https://pbs.twimg.com/profile_images/527272090504683520/EhbXawVf_400x400.png' }}
                activeOpacity={0.7}
              />
            </View>
            <View
              style={{
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}
              >
                  About this JobPost
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 20,
                }}
              >
                This can be your first jobpost but posting job can provide your dream project,
                here you find the reagrding jobskill until it has been posted in jobpost
                section
              </Text>
            </View>
          </View>
          <View>
            {this.props.userProfile.address ? <View
              style={{
                width: width - 20,
                height: (height - 340),
              }}
            >
              <MapView
                width={width}
                height={(height - 340)}
                mapType="standard"
              >
                {this.props.userProfile.address.map(Polyline => (
                  <MapView.Polyline
                    key={Polyline.id}
                    coordinates={Polyline.coordinates}
                    strokeColor="#F00"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                    tappable
                    onPress={this.mapPressed}
                  />
            ))}
                {this.props.userProfile.address.map(Polyline => (
                  <MapView.Marker
                    key={Polyline.id}
                    coordinate={Polyline.coordinates[0]}
                    title={Polyline.plotname}
                  />
            ))}
              </MapView>
            </View> :
            null }
          </View>
          <View
            style={{
              margin: 20,
            }}
          >
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                marginBottom: 20,
                fontWeight: 'bold',
              }}
            >
              Reviews
            </Text>
            <ReviewSection />
            <ReviewSection />
            <View
              style={{
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    marginBottom: 30,
                    color: 'green',
                    fontSize: 18,
                  }}
                >
                Read all 106 Reviews
              </Text>
              </TouchableOpacity>
              <StarRating
                maxStars={4.5}
                rating={4}
                disabled={false}
                starSize={18}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            borderTopWidth: 1.5,
            borderTopColor: '#d3d3d3',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{

              margin: 14,
              marginLeft: 20,
              flexDirection: 'column',
            }}
          >
            <Text
              style={{
                fontSize: 19,
              }}
            >
              ${this.props.userProfile.price} per hour
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <StarRating
                maxStars={5}
                rating={4}
                disabled={false}
                starSize={18}
              />
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 5,
                  marginTop: 4,
                  color: '#696969',
                }}
              >66 Review</Text>
            </View>
          </View>
          <Button
            style={{
              marginTop: 10,
              marginRight: 4,
            }}
            raised
            disabled={this.state.disabled}
            fontSize={25}
            fontWeight="bold"
            title={this.state.disabled ? 'Success' : 'Hire Now'}
            onPress={() => this.sendNotificationWithData(this.props.userProfile, this.props.hiringrofile)}
            backgroundColor="#ff4500"
            borderRadius={5}
          />
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { hiredID: state.hireuser.toJS(), loader: state.loader.toJS(), pushInfo: state.pushnotification.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS(), hiringrofile: state.getprofile.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onGetUserDetails: userId => dispatch(getuserInfoAction.getUserInfo(userId)),
  onSendNotification: (data, type) => dispatch(action.sendNotification(data, type)),
  onHirePerson: (hiringpersonID, hiredpersonID) => dispatch(actionHire.hirePerson(hiringpersonID, hiredpersonID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
