import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ControlPanel extends Component {
  render() {
    const { closeDrawer } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.controlText}>HitchPin</Text>
        <TouchableOpacity style={styles.button} onPress={() => { console.log('test'); this.props.serviceList(); }}>
          <Text style={styles.text}>
            <Icon name="plus-square" size={18} color="#01395e" /> List My Services
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { console.log('test'); this.props.profileUpdate(); }}>
          <Text style={styles.text}>
            <Icon name="user" size={18} color="#01395e" />  Profile
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { console.log('test'); this.props.onSignOut(); }}>
          <Text style={styles.text}>
            <Icon name="sign-out" size={18} color="#01395e" /> Sign Out
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    padding: 10,
    backgroundColor: 'white',
  },
  controlText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#01395e',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#01395e',
  },
});
