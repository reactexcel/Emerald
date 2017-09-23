import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NavigatorIOS,
} from 'react-native';
import { StartPage } from '../components/startpage/startpage';

export default class Emeral extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          ref="nav" initialRoute={{
            component: StartPage,
            title: 'HitchPin',
            tintColor: '#01395e',
          }} style={styles.Navigator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Navigator: {
    flex: 1,
    flexDirection: 'column',
  },
});
