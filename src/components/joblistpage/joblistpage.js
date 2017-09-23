import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import * as postAction from '../../actions/getjoblist';
import { connect } from 'react-redux';
import JobList from '../joblistview/joblist';
import MapPage from '../jobmapview/maplist';
import { Button } from 'react-native-elements';

class Joblistpage extends Component {
  constructor() {
    super();
    this.state = {
      viewmode: 'map',
      currentlocation: '',
    };
    this._changeViewMode = this._changeViewMode.bind(this);
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentlocation: position,
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.props.ongetJobList();
  }
  _changeViewMode() {
    if (this.state.viewmode == 'list') {
      this.setState({
        viewmode: 'map',
      });
    } else {
      this.setState({
        viewmode: 'list',
      });
    }
  }
  render() {
    const { Press, onPress } = this.props;
    return (
      <View style={styles.container}>
        {this.props.loader.isLoading ?
          <View style={styles.loader}>
            <ActivityIndicator
              animating={this.props.loader.isLoading}
              size="large"
            />
          </View> :
          <View
            style={{
              flex: 1,
              marginTop: 70,
            }}
          >
            <Button
              title={this.state.viewmode === 'list' ? 'List View' : 'Map View'}
              onPress={this._changeViewMode}
            />
            {this.state.viewmode === 'list' ? <MapPage currentlocation={this.state.currentlocation} {...this.props} onPress={Press} /> : <JobList {...this.props} onPress={onPress} />}
          </View>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), getjobPost: state.getjobPost.toJS() };
}
const mapDispatchToProps = dispatch => ({
  ongetJobList: () => dispatch(postAction.getjobList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Joblistpage);
