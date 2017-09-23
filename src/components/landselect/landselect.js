import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AlertIOS, ActivityIndicator, ScrollView } from 'react-native';
import SignUp from '../signuppage/signuppage';
import Login from '../login/login';
import style from './styles';
import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import * as action from '../../actions/pushnotification';
import * as actionHire from '../../actions/hireuser';
import PolygonCreator from '../map/map';

class LandSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotname: '',
      checked: [],
      test: false,
      loader: false,
      finalPlot: [ ]
    };
    this.plotCheck = this.plotCheck.bind(this);
  }
  plotCheck() {
    const hiringID = this.props.hiringrofile.data.id;
    const hiringpersonID = this.props.signupID.data || this.props.loginID.data;
    const add = this.props.getjobPost.member[hiringID].profile.address || [];
    const details = this.props.getjobPost.member[hiringpersonID].profile.hiredperson;
    if (details) {
      let finalPlot = [];
      add.map((address, k) => {
        let plotCheck = false;
        Object.keys(details).map((user, i) => {
          if(plotCheck){
          return
          } else{
            details[user].plot.map((p, index) => {
              if (p.plotname === address.plotname) {
                plotCheck = true
              }
            });
          }
        });
        if (!plotCheck) {
          finalPlot.push(address)
        }
      });
      this.setState({ finalPlot });
    } else {
      this.setState({finalPlot:add})
    }
  }
  componentWillMount(){
    this.plotCheck();
  }
  sendNotification(data, name) {
    this.setState({ test: true });
    const hiringperson = this.props.hiringrofile.data;
    const hiringpersonID = this.props.signupID.data || this.props.loginID.data;
    const hiredpersonID = data.id;
    const body = {
      to: data.token,
      notification: {
        title: 'CONGRATULATION',
        body:  `You have been hired by ${hiringperson.firstname} ${hiringperson.lastname} ${hiringperson.phonenumber} ${name}`,
        sound: 'default',
        click_action: 'fcm.ACTION.HELLO',
      },
      data: {
        title: 'Simple FCM Client',
        body: 'This is a notification with NOTIFICATION and DATA (DATA)',
        click_action: 'fcm.ACTION.HELLO',
        remote: true,
      },
      priority: 'high',
    };
    this.props.onSendNotification(JSON.stringify(body), 'notification-data');
  }
  componentWillReceiveProps(props) {
    const hiringpersonID = this.props.signupID.data || this.props.loginID.data;
    this.plotCheck();
    if (props.pushInfo.isSuccess === true && this.state.test === true) {
      this.props.navigator.pop({ });
      this.setState({ loader: false });
      this.setState({ disabled: true });
      this.plotCheck();
      AlertIOS.alert(
        'JOB REQUEST HAS BEEN SEND',
        'PLEASE WAIT FOR THERE RESPONSE',
      );
    }
    if (props.userProfile.id === props.hiringrofile.data.hiredpersonID) {
      this.setState({ disabled: true });
    }
  }
  handleCheckbox(i) {
    const array = this.state.checked;
    const filterArray = array.filter(val => val === i);
    const popArray = [];
    if (filterArray.length > 0) {
      array.map((val) => {
        if (val != i) {
          popArray.push(val);
        }
      });
      this.setState({
        checked: popArray,
      });
    } else {
      array.push(i);
      this.setState({
        checked: array,
      });
    }
  }
  selectedPlot() {
    const hiringPerson = this.props.userProfile;
    const hiringpersonID = this.props.signupID.data || this.props.loginID.data;
    const hiredpersonID = hiringPerson.id;
    const array = [];
    let name = '';
    this.state.checked.map((val) => {
      this.state.finalPlot.map((c, i) => {
        if (i === val) {
          array.push(c);
          if (name !== '') {
            name = `${name},${c.plotname}`;
          } else {
            name = `${name} ${c.plotname}`;
          }
        }
      });
    });
    this.sendNotification(hiringPerson, name);
    this.props.onHirePerson(hiringpersonID, hiredpersonID, array, name);
    this.setState({ loader: true ,checked:[]});
  }
  designPlot() {
    this.props.navigator.push({ component: PolygonCreator,
      tintColor: '#01395e',
      title: 'LandPlot',
    });
  }
  render() {
    const add = this.state.finalPlot;
    if (add !== undefined) {
      console.log('test');
    }
    const test2 = add.length > 0 ? add.map((key, i) => {
      let checkedData = false;
      const checkedArray = this.state.checked.filter(val => val === i);
      if (checkedArray.length > 0) {
        checkedData = true;
      }
      const plot = add[i].plotname;
      return (
        <TouchableOpacity key={i} onPress={() => { this.handleCheckbox(i); }} style={{ flexDirection: 'row' }}>
          <CheckBox
            containerStyle={{ marginLeft: 10, width: 28, backgroundColor: 'transparent', borderWidth: 0, padding: 1 }}
            title=" "
            checkedIcon="check-square-o"
            uncheckedIcon="square-o"
            checkedColor="#3c3c3c"
            id={i}
            onPress={() => { this.handleCheckbox(i); }}
            checked={checkedData}
          />
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 15 }}>
              {plot}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }) : null;
    // const hiringpersonID = this.props.signupID.data || this.props.loginID.data;
    // const details = this.props.getjobPost.member[hiringpersonID].profile.hiredperson;
    // let plotassign ;
    // if (details) {
    //   plotassign = Object.keys(details).map((user, i) => {
    //     const hireduserid = details[user].id
    //     const addplots = details[user].plot.map((test, k ) => {
    //       return (
    //           <View style={{ flexDirection: 'column', borderBottomWidth: 1 }}>
    //               <Text>
    //                 PLOT NAME :- {details[user].plot[k].plotname}
    //               </Text>
    //             <View style={{ flexDirection: 'row' }}>
    //               <Text>
    //                 Assign Person Name :-
    //               </Text>
    //               <Text>
    //               {this.props.getjobPost.member[hireduserid].profile.firstname}
    //               </Text>
    //               <Text style={{ marginLeft: 3 }}>
    //               {this.props.getjobPost.member[hireduserid].profile.lastname}
    //               </Text>
    //             </View>
    //           </View>
    //       );
    //     });
    //     return addplots
    //   });
    // }
    return (
      <View style={style.OuterContainer}>
        {this.state.loader ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.state.loader}
              style={{ height: 80 }}
              size="large"
            />
          </View> :
          <View style={{ flex: 1 }}>
           {add.length !== undefined && add.length > 0 ? <View >
             <Text>
               Choose Your Field For This Particular User
             </Text>
             {test2}
             <Button
               raised
               onPress={() => { this.selectedPlot(); }}
               title="Assign Plot"
             />
           </View> : <View><Button
             raised

             onPress={() => { this.designPlot(); }}
             title="Plot Lands"
             backgroundColor="#01395e"
             fontSize={18}
            //  icon={{ name: 'user-plus', type: 'font-awesome' }}
             borderRadius={5}
           /></View>}
            {/* {details && (<ScrollView style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18 }}>
                Plot Assign to User
              </Text>
              {plotassign}
            </ScrollView>)} */}
          </View>}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { getjobPost: state.getjobPost.toJS(), hiredID: state.hireuser.toJS(), loader: state.loader.toJS(), pushInfo: state.pushnotification.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS(), hiringrofile: state.getprofile.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onSendNotification: (data, type) => dispatch(action.sendNotification(data, type)),
  onHirePerson: (hiringpersonID, hiredpersonID, array, name) => dispatch(actionHire.hirePerson(hiringpersonID, hiredpersonID, array, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandSelect);
