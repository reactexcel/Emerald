import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import style from './styles';
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

export class MapPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      land: [],
    };
  }
  componentWillMount(props) {
    this.state.land.push(this.props.plotLang);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          width={width}
          height={height}
          mapType={MapView.MAP_TYPES.HYBRID}
        >
          {this.state.land.map(Polyline => (
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
          {this.state.land.map(Polyline => (
            <MapView.Marker
              key={Polyline.id}
              coordinate={Polyline.coordinates[0]}
              title={Polyline.plotname}
              description={Polyline.plotarea}
            />
      ))}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
function mapStateToProps(state) {
  return { userprofile: state.getjobPost.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS() };
}
export default connect(mapStateToProps)(MapPlot);
