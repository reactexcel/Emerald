import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SignUp from '../signuppage/signuppage';
import Login from '../login/login';
import style from './styles';
import { Button } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PolygonCreator from '../map/map';
import MapPlot from './showplot';


class ShowUserPlots extends Component {
  constructor(props) {
    super(props);
  }
  designPlot() {
    this.props.navigator.push({ component: PolygonCreator,
      title: 'LandPlot',
    });
  }
  onSelectItem(item, i) {
    this.props.navigator.push({ component: MapPlot, title: 'Plots', passProps: { plotId: i, plotLang: item } });
  }
  render() {
    const test = [];
    const userid = this.props.signupID.data || this.props.loginID.data;
    const address = this.props.userprofile.member[userid].profile.address;
    return (
      <View style={style.OuterContainer}>
        {address ? <List>
          {
            address.map((item, i) => (
              <ListItem
                key={i}
                title={item.plotname}
                onPress={() => { this.onSelectItem(item, i); }}
                subtitle={item.plotarea}
              />
            ))
          }
        </List> : <View style={{ marginTop: 45 }}><Button
          raised
          onPress={() => { this.designPlot(); }}
          title="Plot Lands"
        /></View>}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { userprofile: state.getjobPost.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(loginAction.login(email, password)),
  onSignout: () => dispatch(signoutAction.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserPlots);
