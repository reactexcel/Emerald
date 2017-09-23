/* eslint disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Picker, AlertIOS, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import * as _ from 'lodash';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as updateProfileAction from '../../actions/updateProfile';
import * as getuserInfoAction from '../../actions/getuserprofile';
import * as postAction from '../../actions/getjoblist';
import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get('window');


import style from './styles';

class MyService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkill: '',
      skillList: [],
      isDisplay: true,
    };
    this.addSkill = this.addSkill.bind(this);
    this.showSkill = this.showSkill.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
  }
  componentWillMount() {
    const userId = this.props.signupID.data || this.props.loginID.data;
    this.props.onGetUserDetails(userId).then((val) => {
      if (this.props.userprofile.data.skills !== undefined) {
        this.setState({ skillList: this.props.userprofile.data.skills });
      }
    });
  }
  componentWillReceiveProps() {

  }
  addSkill() {
    const userId = this.props.signupID.data || this.props.loginID.data;
    const skills = this.state.skillList;
    if (skills.length > 0) {
      this.props.onUpdateUserSkill(userId, skills).then((val) => {
        this.props.onGetUserDetails(userId);
        this.props.navigator.pop({});
      });
    } else {
      AlertIOS.alert(
        'Please Enter Your Skill',
      );
    }
  }
  showSkill() {
    if (this.state.newSkill.length > 1) {
      this.setState({ isDisplay: true });
      this.handleAddSkill();
    } else {
      AlertIOS.alert(
        'Please Enter Your Skill',
      );
      this.setState({ isDisplay: false });
    }
  }
  handleAddSkill() {
    const skill = this.state.skillList;
    skill.push(this.state.newSkill);
    this.setState({ skillList: skill, newSkill: '' });
    AlertIOS.alert(
      'Skill Added ',
    );
  }
  handleremove(skill) {
    const list = this.state.skillList;
    const newList = [];
    const check = _.map(list, (value, index) => {
      if (value === skill) {

      } else {
        newList.push(value);
      }
    });
    this.setState({ skillList: newList });
  }
  render() {
    const showSkill = this.state.isDisplay === true ?
    _.map(this.state.skillList, skill =>
      (<View key={skill} style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }} elevation={8}>
        <Text
          style={{ marginLeft: 20, fontSize: 18 }}
        >
          {skill} </Text>
        <TouchableOpacity onPress={() => { }}>
          <Icons
            style={{ marginRight: 28 }}
            size={28}
            name="times"
            color="red"
            onPress={() => { console.log('test'); this.handleremove(skill); }}
          />
        </TouchableOpacity>
      </View>)) : null;
    return (
      <View style={style.OuterContainer}>
        {this.props.loader.isLoading ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.props.loader.isLoading}
              style={{ height: 80 }}
              size="large"
            />
          </View> : <View style={{ flex: 1 }}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}
              >Add New Skill</Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 10, marginTop: 20 }}>
              <TextInput
                style={{ height: 35, width: width - 95, marginTop: 10, marginLeft: 20, marginRight: 5, borderWidth: 1, borderRadius: 6, borderColor: 'black', padding: 8 }}
                value={this.state.newSkill}
                placeholder="Add New Skill"
                placeholderTextColor="grey"
                onChangeText={(text) => { this.setState({ newSkill: text }); }}
              />

              {this.state.newSkill.length > 0 ?
                <Icon
                  raised
                  size={18}
                  name="plus-circle"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => {
                    this.showSkill();
                  }}
                /> : null}
            </View>
            { this.state.skillList.length > 0 ? <View style={{ flex: 10, margin: 10 }} elevation={10}>
              <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Your Skill List</Text>
              <ScrollView >
                {showSkill}
              </ScrollView>
            </View> : null}
            { this.state.skillList.length > 0 ? <View style={style.button}>
              <Button
                raised
                title="Update Skill "
                onPress={this.addSkill}
                backgroundColor="#01395e"
                borderRadius={5}
              />
            </View> : null}
          </View>}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { signupID: state.signup.toJS(), loginID: state.login.toJS(), userprofile: state.getprofile.toJS(), profileupdate: state.profileUpdate.toJS(), loader: state.loader.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onUpdateUserSkill: (userId, skills) => dispatch(updateProfileAction.userSkillUpdate(userId, skills)),
  onGetUserDetails: userId => dispatch(getuserInfoAction.getUserInfo(userId)),
  ongetJobList: () => dispatch(postAction.getjobList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyService);
