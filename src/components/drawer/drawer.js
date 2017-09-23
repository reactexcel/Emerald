import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from './styles';
import Drawer from 'react-native-drawer';
import ControlPanel from './controlpanel';
import Joblistpage from '../joblistpage/joblistpage';
import { connect } from 'react-redux';
import * as loginAction from '../../actions/login';
import ProfileComplete from '../profilecomplete/profilecomplete';
import * as signoutAction from '../../actions/signup';
import UserDetailsPage from '../userdetailpage/userdetailpage';
import MyServiesList from '../listmyservices/listmyservices';
var EventEmitter = require('EventEmitter');

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
    };
    this.signOut = this.signOut.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.listDetails = this.listDetails.bind(this);
    this.handleViewList = this.handleViewList.bind(this);
    this.serviceList = this.serviceList.bind(this);
  }
  componentWillMount() {
        this.eventEmitter = new EventEmitter();
    }

  componentWillReceiveProps(props) {
    if (props.drawer.open === true) {
      this.setState({ drawer: true });
    }
  }
  drawerColse() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
  }
  signOut() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
    this.props.onSignout();
    this.props.navigator.popToTop({});
  }
  updateProfile() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
    this.props.navigator.push({
      component: ProfileComplete,
      tintColor: '#01395e',
      title: 'Profile',
    });
  }
  listDetails(data) {
    this.props.navigator.push({
      component: UserDetailsPage,
      tintColor: '#01395e',
      passProps: { userProfile: data, title: ' ' }
    });
  }
  serviceList() {
    this.setState({ drawer: false });
    this.props.onDrawerClose();
    this.props.navigator.push({
      component: MyServiesList,
      tintColor: '#01395e',
      title: 'List My Service',
      rightButtonTitle: 'Service List',
      passProps: { events:this.eventEmitter },
      onRightButtonPress: () => this.eventEmitter.emit('service_list_pressed')
    });
  }
  handleViewList(data) {
    this.props.navigator.push({
      component: UserDetailsPage,
      tintColor: '#01395e',
      passProps: { userProfile: data, title: ' ' }
    });
  }
  render() {
    return (
      <Drawer
        type="overlay"
        open={this.state.drawer}
        content={<ControlPanel onSignOut={this.signOut} profileUpdate={this.updateProfile} serviceList={this.serviceList} />}
        tapToClose
        onClose={() => { this.drawerColse(); }}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <Joblistpage {...this.props} onPress={this.listDetails} Press={this.handleViewList} />
      </Drawer>
    );
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), drawer: state.login.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onDrawer: () => dispatch(loginAction.openDrawer()),
  onDrawerClose: () => dispatch(loginAction.closeDrawer()),
  onSignout: () => dispatch(signoutAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
