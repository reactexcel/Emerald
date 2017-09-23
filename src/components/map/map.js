import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  AlertIOS,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import * as postAction from '../../actions/updateProfile';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import * as Action from '../../actions/getjoblist';
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
let id = 0;

class PolygonCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plotname: '',
      plotarea: '',
      polylines: [],
      editing: null,
      finalplot: [],
      scroll: true,
    };
    this.updatePlot = this.updatePlot.bind(this);
  }

  finish() {
    const { polylines, editing } = this.state;
    this.setState({
      polylines: [...polylines, editing],
      editing: null,
      scroll: true,
    });
  }
  componentWillMount() {
    id = 0;
  }
  // componentWillReceiveProps(){
  //
  // }
  clear() {
    const { polylines, editing } = this.state;
    this.setState({
      polylines: [],
      plotname: '',
      editing: null,
      scroll: true,
    });
    id = 0;
  }
  updatePlot() {
    if (this.state.plotname.length >= 1 && this.state.plotarea.length >= 1) {
      const test2 = this.state.polylines;
      test2[id - 1].plotname = this.state.plotname;
      test2[id - 1].plotarea = this.state.plotarea;
      this.setState({ finalplot: test2, plotname: '' });
    } else {
      AlertIOS.alert(
        'CHECK THIS!',
        'Please Provide a Sutibale Title for your plot',
      );
    }
  }
  finalPlot() {
    const userid = this.props.signupID.data || this.props.loginID.data;
    const address = this.props.userprofile.member[userid].profile.address;
    const test = this.state.finalplot;
    if (address) {
      test.map((key, i) => {
        address.push(key);
      });
      address.map((v, i) => {
        v.id = i;
      });
      this.props.onupdateLocation(userid, address).then((val) => {
        this.props.navigator.pop();
      });
    } else {
      this.props.onupdateLocation(userid, this.state.finalplot).then((val) => {
        this.props.navigator.pop();
      });
    }
  }
  onPanDrag(e) {
    const { editing } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
        },
      });
    } else {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    }
  }
  onPress() {
    this.setState({ scroll: false });
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  render() {
    const mapOptions = {
      scrollEnabled: this.state.scroll,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPanDrag(e);
    }
    return (
      <View style={{ flex: 1 }}>
        {this.props.loader.isLoading ?
          <View style={styles.loader}>
            <ActivityIndicator
              animating={this.props.loader.isLoading}
              style={{ height: 80 }}
              size="large"
            />
          </View> :
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={styles.container}>
              <MapView
                provider={this.props.provider}
                style={styles.map}
                mapType={MapView.MAP_TYPES.HYBRID}
                loadingEnabled
                scrollEnabled={false}
                onPanDrag={e => this.onPanDrag(e)}
                onPress={() => { this.onPress(); }}
                {...mapOptions}
              >
                {this.state.polylines.map(polyline => (
                  <MapView.Polyline
                    key={polyline.id}
                    coordinates={polyline.coordinates}
                    strokeColor="#000"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                    lineCap="round"
                    lineJoin="round"
                    geodesic
                  />
                ))}
                {this.state.editing &&
                  <MapView.Polyline
                    key="editingPolyline"
                    coordinates={this.state.editing.coordinates}
                    strokeColor="#F00"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                    lineCap="round"
                    lineJoin="round"
                    geodesic
                  />
                }
              </MapView>
              {this.state.polylines.length !== this.state.finalplot.length && (<View style={styles.textcontainer}>
                <TextInput
                  ref="1"
                  autoFocus
                  enablesReturnKeyAutomatically
                  style={styles.SecondInput}
                  onChangeText={plotname => this.setState({ plotname })}
                  returnKeyType="next"
                  keyboardType="email-address"
                  value={this.state.plotname}
                  placeholderTextColor={'black'}
                  placeholder="Write Your Plot Name"
                  onSubmitEditing={() => this.focusNextField('2')}
                />
                <TextInput
                  ref="2"
                  nablesReturnKeyAutomatically
                  style={styles.SecondInput}
                  onChangeText={plotarea => this.setState({ plotarea })}
                  returnKeyType="go"
                  value={this.state.plotarea}
                  placeholderTextColor={'black'}
                  placeholder="Write Your Plot Area In Acreas"
                />
              </View>)}
              <View style={styles.buttonContainer}>
                {this.state.editing && (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => this.finish()}
                      style={[styles.bubble, styles.button]}
                    >
                      <Text>Finish</Text>
                    </TouchableOpacity>
                    {this.state.polylines.length >= 1 ? null :
                    <TouchableOpacity
                      onPress={() => this.clear()}
                      style={[styles.bubble, styles.button]}
                    >
                      <Text>Clear</Text>
                    </TouchableOpacity>}
                  </View>
                )}{this.state.plotname.length >= 1 && (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => this.clear()}
                      style={[styles.bubble, styles.button]}
                    >
                      <Text>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.updatePlot()}
                      style={[styles.bubble, styles.button]}
                    >
                      <Text>Update Plot Info</Text>
                    </TouchableOpacity>
                  </View>
                )}{this.state.finalplot.length > 0 && this.state.polylines.length === this.state.finalplot.length && (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => this.finalPlot()}
                      style={[styles.bubble, styles.button]}
                    >
                      <Text>Final Update</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>}
      </View>
    );
  }
}

PolygonCreator.propTypes = {
  provider: MapView.ProviderPropType,
};

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
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 60,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  Buttons: {
    flex: 1,
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  textcontainer: {
    marginVertical: 80,
    marginBottom: 355,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  text: {
    flex: 1,
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  SecondInput: {
    padding: 8,
    height: 40,
    width,
  },
});
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), signupID: state.signup.toJS(), loginID: state.login.toJS(), userprofile: state.getjobPost.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onupdateLocation: (userID, plotAdd) => dispatch(postAction.userLoactionupdate(userID, plotAdd)),
  ongetJobList: () => dispatch(Action.getjobList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PolygonCreator);
