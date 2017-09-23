import { Provider } from 'react-redux';
import React, { Component } from 'react';
import store from '../store/configure-store';
import Emeral from './app';
import * as firebase from 'firebase';
import { config } from '../config/config';
const FbApp = firebase.initializeApp(config);
module.exports.FBApp = FbApp.database();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Emeral />
      </Provider>
    );
  }
}
export default Root;
