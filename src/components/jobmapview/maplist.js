import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import JobList from './mapjoblist';
import { connect } from 'react-redux';
import * as postAction from '../../actions/getjoblist';

const { width, height } = Dimensions.get('window');
class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      region: {
        latitude: this.props.currentlocation.coords.latitude,
        longitude: this.props.currentlocation.coords.longitude,
        latitudeDelta: 0.52,
        longitudeDelta: 0.52,
      },
      selectedId: 1,
      selectedMarker: '',
      index: 0,
    };
  }
  componentWillMount(props) {
    const jobs = this.props.getjobPost.data;
    const ret = [];
    const j = 0;
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].userlocation) {
        ret.push({
          coordinates: {
            latitude: jobs[i].userlocation.latitude,
            longitude: jobs[i].userlocation.longitude,
          },
          title: jobs[i].firstname,
          description: jobs[i].skill,
          id: jobs[i].id,
          firstname: jobs[i].firstname,
          lastname: jobs[i].lastname,
          location: jobs[i].location,
          phonenumber: jobs[i].phonenumber,
          skills: jobs[i].skills,
          price: jobs[i].price,
          address: jobs[i].address,
          token: jobs[i].token,
          image: jobs[i].image,
          userlocation: jobs[i].userlocation,
        });
      }
    }
    this.setState({ markers: ret });
  }
  _markerSelected(obj, index) {
    this.setState({ selectedMarker: obj, index });
    const test = {
      latitude: obj.coordinates.latitude,
      longitude: obj.coordinates.longitude,
      latitudeDelta: 0.52,
      longitudeDelta: 0.52,
    };
    this.setState({ region: test });
  }
  render() {
    const { jobs, selectHomeJobDetail } = this.props.getjobPost.data;
    const { onPress } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <MapView
              width={width}
              showsUserLocation
              // followsUserLocation
              height={(height - 280)}
              mapType="standard"
              region={this.state.region}
            >
              {this.state.markers.map((marker, i) => {
                const actucalskill = marker.skills !== undefined ? marker.skills[0] : marker.description;
                return (
                  <MapView.Marker
                    key={i}
                    onSelect={() => { this._markerSelected(marker, i); }}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={actucalskill}
                  />);
              },
              )}
            </MapView>
          </View>
          {this.state.selectedId != -1 ? <View
            style={{
              flex: 1,
            }}
          >
            <JobList selectedIndex={this.state.index} data={this.state.markers} marker={this.state.selectedMarker} onPress={onPress} selected={false} />
          </View> : null}
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), getjobPost: state.getjobPost.toJS() };
}
const mapDispatchToProps = dispatch => ({
  ongetJobList: () => dispatch(postAction.getjobList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: width - 20,
    height: (height - 280),
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  jobContainer: {
    paddingLeft: 20,
    backgroundColor: 'white',
  },
});
